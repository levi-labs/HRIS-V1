import { Request, Response,NextFunction } from "express";
import { getAllDepartments,
        getDepartmentById, 
        createDepartment, 
        updateDepartment,
        deleteDepartment
      }
       from "../services/department.service.js";
import { createDepartmentSchema } from "../validations/department.validation.js";
import { ZodError } from "zod";

export const getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const departments = await getAllDepartments();
            res.status(200).json({
                statusCode: 200,
                message: "Success",
                data: departments
            });
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: "Something went wrong",
                error: error instanceof Error ? error.message : undefined
            });
        }
    };
export const getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const department = await getDepartmentById(id);
            if (!department) {
                 res.status(404).json({
                     statusCode: 404,
                     message: "Department not found"
                 });
                 return;
            }
            res.status(200).json(department);
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: "Something went wrong",
                error: error instanceof Error ? error.message : undefined
            });
        }
    };

export const create = async (req: Request, res: Response): Promise<void> => {
        try {
            const validatedData = createDepartmentSchema.parse(req.body);

            const department = await createDepartment(validatedData);

            res.status(201).json({
                statusCode: 201,
                message: "Success",
                data: department
            });
        } catch (error) {
             if (error instanceof ZodError) {
                    const errorMessages = error.errors.map((err) => ({
                        field:err.path.join("."),
                        message:err.message,
                    }));
                   res.status(422).json({
                    message: "Validation Error",
                    error: errorMessages,
                  });
                  return;
                }
            res.status(500).json({
                statusCode: 500,
                message: "Something went wrong",
                error: error instanceof Error ? error.message : undefined
            });
        }
    };

    export const update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const validatedData = createDepartmentSchema.parse(req.body);

            const department = await updateDepartment(id, validatedData);    

            res.status(200).json({
                statusCode: 200,
                message: "Success",
                data: department
            });
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((err) => ({
                    field:err.path.join("."),
                    message:err.message,
                }));
               res.status(422).json({
                message: "Validation Error",
                error: errorMessages,
              });
             return
            }
            res.status(500).json({
                statusCode: 500,
                message: "Something went wrong",
                error: error instanceof Error ? error.message : undefined
            });
        }
    };

    export const destroy = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const department = await deleteDepartment(id);
            res.status(200).json({
                statusCode: 200,
                message: "Success",
                data: department
            });
        } catch (error) {
            res.status(500).json({
                statusCode: 500,    
                message: "Something went wrong",
                error: error instanceof Error ? error.message : undefined
            });
        }
    };