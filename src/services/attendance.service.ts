
import { Attendance } from "@prisma/client";
import prisma from "../config/prismaClient.js";
import { IAttendanceResponse, IAttendance, IAttendanceCheckIn } from "../types/attendance.types.js";
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

export const checkInAttendance = async (data: IAttendanceCheckIn) => {
    const checkInTime = new Date(data.checkIn);
    const hour = checkInTime.getHours();
    const minute = checkInTime.getMinutes();

    if (hour < 8 || (hour === 9 && minute > 0)) {
        throw new Error("Check-in time must be between 8:00 and 9:00 ");
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