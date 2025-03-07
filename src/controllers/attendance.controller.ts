import { Request, Response, NextFunction } from "express";
import { getAll, getById, updateAttendance, removeAttendance, createAttendance, checkInAttendance } from "../services/attendance.service.js";
import { attendanceSchema } from "../validations/attendance.validation.js";

export const index = async (req: Request, res: Response, next: NextFunction) => {
   try {
        const attendances = await getAll();
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: attendances
        });
   } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
   }
};  

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const attendance = await getById(id);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: attendance
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
}
/**
 * Create a new attendance record
 *
 * @param {Request} req - The incoming request
 * @param {Response} res - The outgoing response
 * @param {NextFunction} next - The next middleware to call
 *
 * @returns {Promise<void>}
 */
export const checkIn = async (req:Request, res: Response,next: NextFunction): Promise<void> => {
    try {
        const data = await checkInAttendance(req.body);
        res.status(200).json({
            statusCode: 201,
            message: data.message,
            data : data
        });
    } catch (error) {
        res.status(500).json({
            statusCode : 500,
            message: "Something went wrong",
            error: error instanceof Error? error.message : undefined
        });
    }
}


export const destroy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const attendance = await removeAttendance(id);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: attendance
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
}