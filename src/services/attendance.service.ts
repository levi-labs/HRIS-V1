
import { Attendance } from "@prisma/client";
import prisma from "../config/prismaClient.js";
import { IAttendanceResponse, IAttendance, IAttendanceCheckIn,IAttendanceCheckInResponse } from "../types/attendance.types.js";
import  {Decimal} from "decimal.js";
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
    })
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