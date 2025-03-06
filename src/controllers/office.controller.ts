import { Request, Response, NextFunction } from "express";
import { createOffice, deleteOffice, getAllOffices, getOfficeById, updateOffice } from "../services/office.service.js";
import { officeSchema } from "../validations/office.validation.js";

export const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const offices = await getAllOffices();
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: offices
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
};

export const show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const office = await getOfficeById(id);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: office
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
};

export const store = async (req: Request, res: Response, next: NextFunction): Promise<void> => {    
    try {
        const validatedData = officeSchema.parse(req.body);
        const office = await createOffice(validatedData);
        res.status(201).json({
            statusCode: 201,
            message: "Success",
            data: office
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
}

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const validatedData = officeSchema.parse(req.body);
        const office = await updateOffice(id, validatedData);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: office
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
}

export const destroy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const office = await deleteOffice(id);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: office
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
}   