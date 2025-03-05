
import { Attendance } from "@prisma/client";
import prisma from "../config/prismaClient.js";
import { IAttendance } from "../types/attendance.types.js";
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

export const createAttendance = async (data: IAttendance): Promise<Attendance> => {
    const attendance = await prisma.attendance.create({
        data : data
    });
    return attendance;
}

export const updateAttendance = async (id: number, data: Partial<IAttendance>): Promise<Attendance> => {
    const attendance = await prisma.attendance.update({
        where : {
            id : id
        },
        data : data
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