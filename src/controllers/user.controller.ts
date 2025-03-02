import { Request, Response , RequestHandler} from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../services/user.service.js";



export const getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const users = await getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    };

export const getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = parseInt(req.params.id);
            const user = await getUserById(userId);
            if (!user) {
                 res.status(404).json({ message: "User not found" });
                 return;
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" });
        }
};
         
    
export const create = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = await createUser(req.body);
            res.status(201).json({
                statusCode: 201,
                message: "User created successfully",
                data: user
            });
        } catch (error) {
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
            const user = await updateUser(id, req.body);
            res.status(200).json({
                statusCode: 200,
                message: "User updated successfully",
                data: user
            });
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: "Something went wrong",
                error: error instanceof Error ? error.message : undefined
            });
        }
} 

export const destroy = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const user = await deleteUser(id);
            res.status(200).json({
                statusCode: 200,
                message: "User deleted successfully",
                data: user
            });
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                message: "Something went wrong",
                error: error instanceof Error ? error.message : undefined
            });
        }
}