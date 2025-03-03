import { Request, Response, NextFunction } from "express";
import { getAllJobPositions,createJobPosition,updateJobPosition,getJobPositionById,deleteJobPosition } from "../services/jobPotition.service.js";


export const index = async (req: Request, res: Response, next: NextFunction) => {
    const jobPositions = await getAllJobPositions();
   res.status(200).json({
       statusCode: 200,
       message: "Success",
       data: jobPositions
   });
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const jobPosition = await getJobPositionById(id);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: jobPosition
        });
    } catch (error) {
        res.status(500).json({
                statusCode: 500,
                message: "Something went wrong",
                error: error instanceof Error ? error.message : undefined
        });
    }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const jobPosition = await createJobPosition(req.body);
    res.status(201).json({
        statusCode: 201,
        message: "Success",
        data: jobPosition
    });
   } catch (error) {
    res.status(500).json({
        statusCode: 500,
        message: "Something went wrong",
        error: error instanceof Error ? error.message : undefined
    });
   }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const jobPosition = await updateJobPosition(id, req.body);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: jobPosition
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const jobPosition = await deleteJobPosition(id);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: jobPosition
        });
    } catch (error) {    
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
}