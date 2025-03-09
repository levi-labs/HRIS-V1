
import { Attendance } from "@prisma/client";
import prisma from "../config/prismaClient.js";
import { IAttendanceResponse, IAttendance, IAttendanceCheckIn, IAttendanceCheckOut,IAttendanceCheckInResponse ,IAttendanceCheckOutResponse} from "../types/attendance.types.js";
import  {Decimal} from "decimal.js";
import { haversineFormula } from "../utils/harvesine.js";
export const getAll = async () => {
    const attendances = await prisma.attendance.findMany();
    return attendances;
}

export const getById = async (id: number): Promise<Attendance | null> => {
    const attendance = await prisma.attendance.findUnique({
        where : {
            id : id
        }
    });
    return attendance;
}

export const createAttendance = async (data: IAttendance): Promise<IAttendanceResponse> => {
    //make transaction
    return await prisma.$transaction(async (tx) => {
        const time = new Date(data.date).getTime();

        if (time > new Date().getTime()) {
            
        }
        const attendance = await tx.attendance.create({ 
            data: {
                employeeId: data.employeeId,
                date: new Date(data.date),
                checkIn: new Date(data.checkIn),
                checkOut: data.checkOut ? new Date(data.checkOut).toISOString() : '',
                status: data.status,
            }
        });

        const geolocation = await tx.geolocation.create({
            data: {
                checkInLatitude: data.latitude,
                checkInLongitude: data.longitude,
                checkOutLatitude: data.latitude,
                checkOutLongitude: data.longitude,
                attendance_id: attendance.id
            }
        });

        return {
            id: attendance.id,
            employeeId: attendance.employeeId,
            date: attendance.date.toISOString(),
            checkIn: attendance.checkIn.toISOString(),
            checkOut: attendance.checkOut ? attendance.checkOut?.toISOString() : null,
            status: attendance.status,
            geolocation: {
                id: geolocation.id,
                checkInLongitude: geolocation.checkInLongitude.toNumber(), // Convert Decimal to number
                checkInLatitude: geolocation.checkInLatitude.toNumber(),   // Convert Decimal to number
                checkOutLongitude: geolocation.checkOutLongitude ? geolocation.checkOutLongitude.toNumber() : null,
                checkOutLatitude: geolocation.checkOutLatitude ? geolocation.checkOutLatitude.toNumber() : null,
            }
        };
    });
  
}

export const updateAttendance = async (id: number, data: IAttendance): Promise<Attendance> => {
    const attendance = await prisma.attendance.update({
        where : {
            id : id
        },
        data : {
            employeeId: data.employeeId,
            date: new Date(data.date),
            checkIn: new Date(data.checkIn),
            checkOut: data.checkOut ? new Date(data.checkOut).toISOString() : '',
            status: data.status
        }
    });
    return attendance;
}

export const removeAttendance = async (id: number): Promise<Attendance> => {
    const attendance = await prisma.attendance.delete({
        where : {
            id : id
        }
    });
    return attendance;
}

export const checkInAttendance = async (data: IAttendanceCheckIn): Promise<IAttendanceCheckInResponse> => {
    const checkInTime = new Date(data.checkIn);
    const hour = checkInTime.getHours();
    const minute = checkInTime.getMinutes();
    //make convert to decimal
    const latitude = new Decimal(data.latitude);
    const longitude = new Decimal(data.longitude);

    const employeeId = await prisma.employee.findFirst({
        where : {
            id : data.employeeId
        },
        include : {
            Office : true
        }
    });
    
    const checkOfficeLocation = await prisma.office.findUnique({
        where : {
            id : employeeId?.Office.id
        }
    });

    const distance =  haversineFormula(
        checkOfficeLocation!.latitude.toNumber(),
        checkOfficeLocation!.longitude.toNumber(),
        latitude.toNumber(),
        longitude.toNumber()
    )
    if (hour < 8 || (hour === 9 && minute > 0)) {
        throw new Error("Check-in time must be between 8:00 and 9:00 ");
    }
    
    if (latitude !== checkOfficeLocation?.latitude || longitude !== checkOfficeLocation?.longitude) {
        throw new Error("Check-in location must be in office location");
    }
    
    return await prisma.$transaction(async (tx) => {
            const attendance = await tx.attendance.create({
                data: {
                    employeeId: data.employeeId,
                    date: new Date(data.date),
                    checkIn: checkInTime,
                    checkOut: '',
                    status: hour === 8 ? "Present" : "Late", // Status normal atau terlambat
                }
            });

            await tx.geolocation.create({
                data :{
                    checkInLatitude: data.latitude,
                    checkInLongitude: data.longitude,
                    attendance_id: attendance.id
                }
            });

            return {
                message : "Check-in successfully",
                attendanceID : attendance.id,
                checkInTime : attendance.checkIn.toISOString(),
                status : attendance.status
            }
    });
    
}

export const checkOutAttendance = async (data: IAttendanceCheckOut): Promise<IAttendanceCheckOutResponse> => {
    const checkOutTime = new Date(data.checkOut);
    const hour = checkOutTime.getHours();
    const minute = checkOutTime.getMinutes(); 
    const latitude = new Decimal(data.latitude);
    const longitude = new Decimal(data.longitude);

    const employeeId = await prisma.employee.findUnique({
        where : {
            id : data.employeeId
        },
        include : {
            Office : true
        }

    });
    const checkOfficeLocation = await prisma.office.findUnique({
        where : {
            id : employeeId?.office_id
        }
    });

    const distance = haversineFormula(
        checkOfficeLocation!.latitude.toNumber(), 
        checkOfficeLocation!.longitude.toNumber(), 
        latitude.toNumber(), 
        longitude.toNumber()
    );

    if (hour < 17 || (hour === 17 && minute > 0)) {
        throw new Error("Check-out time must be between 05:00 PM and 09:30 PM");
    }
    
    if (distance > 100 ) {
        throw new Error("Check-out denied. You are outside the permitted distance range.");
    }

    return await prisma.$transaction(async (tx) => {
       
        const attendance = await tx.attendance.findFirst({
            where : {
                id : data.employeeId
            }
        });

        if (!attendance) {
            throw new Error("Attendance not found");
        }

        await tx.attendance.update({
            where : {
                id : data.employeeId
            },
            data : {
                checkOut : checkOutTime,
                status : hour >= 17 && minute >= 0 ? "Present" : "Overtime"
            }
        });

        const geolocation = await tx.geolocation.findFirst({
            where : {
                attendance_id : attendance.id
            }
        });
        if (!geolocation) {
            throw new Error("Geolocation not found");
        }
       
        await tx.geolocation.update({
            where : {
                id : geolocation.id
            },
            data : {
                checkOutLatitude : data.latitude,
                checkOutLongitude : data.longitude
            }
        });
        return {
            message : "Check-out successfully",
            attendanceID : attendance.id,
            checkOutTime : attendance.checkOut?.toISOString() || '',
            status : attendance.status
        }
    });
}