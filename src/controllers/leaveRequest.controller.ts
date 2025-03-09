import { Request, Response } from "express";
import { approveLeaveRequest, createLeaveRequest, getAllLeaveRequests, updateLeaveRequest,deleteLeaveRequest } from "../services/leaverequest.service.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import app from "../app.js";


export const index = async (req: Request, res: Response):Promise<void> => {
    try {
        const data = await getAllLeaveRequests();
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: data
        });
    } catch (error) {
        res.status(500).json({ 
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
};

export const show = async (req: Request, res: Response):Promise<void> => {
    try {
        const data = await getAllLeaveRequests();
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: data
        });
    } catch (error) {
        res.status(500).json({ 
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
};

export const create = async (req: AuthRequest, res: Response):Promise<void> => {
    try {
        const userId = req.user?.id;
        const data = await createLeaveRequest(userId!,req.body);
        res.status(201).json({
            statusCode: 201,
            message: "Success",
            data: data
        });
    } catch (error) {
        res.status(500).json({
             statusCode: 500,
             message: "Something went wrong", 
             error: error instanceof Error ? error.message : undefined
         });
    }
};

export const update = async (req: AuthRequest, res: Response):Promise<void> => {
    try {
        const userId = req.user?.id;
        const params = parseInt(req.params.id);
        const data = await updateLeaveRequest(params,req.body,userId!);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: data
        });
    } catch (error) {
        res.status(500).json({
             statusCode: 500,
             message: "Something went wrong",
             error: error instanceof Error ? error.message : undefined
        });
    }
};

export const destroy = async (req: AuthRequest, res: Response):Promise<void> => {
    try {
        const params = parseInt(req.params.id);
        const data = await deleteLeaveRequest(params);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: data
        });
    } catch (error) {
        res.status(500).json({ 
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
}
export const approved = async (req: AuthRequest, res: Response):Promise<void> => {
    try {
        const userId = req.user?.id;
        const params = parseInt(req.params.id);
        const data = await approveLeaveRequest(params,userId!);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: data
        });
    } catch (error) {
        res.status(500).json({
             statusCode: 500,
             message: "Something went wrong", 
             error: error instanceof Error ? error.message : undefined
         });
    }
};