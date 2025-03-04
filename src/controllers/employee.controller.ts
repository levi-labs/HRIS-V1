import e, { Request, Response, NextFunction } from "express";
import { EmployeeService } from "../services/employee.service.js";
import { employeeSchema } from "../validations/employee.validation.js";



export const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const employees = await EmployeeService.getAllEmployees();
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: employees
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
        const employee = await EmployeeService.getEmployeeById(id);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const validatedData = employeeSchema.parse(req.body);
        const employee = await EmployeeService.createEmployee(validatedData);
        res.status(201).json({
            statusCode: 201,
            message: "Success",
            data: employee
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
        const validatedData = employeeSchema.parse(req.body);
        const employee = await EmployeeService.updateEmployee(id, validatedData);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: employee
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
        const employee = await EmployeeService.deleteEmployee(id);
        res.status(200).json({
            statusCode: 200,
            message: "Success",
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : undefined
        });
    }
}