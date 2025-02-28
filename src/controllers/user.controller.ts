import { Request, Response , RequestHandler} from "express";
import { getAllUsers, getUserById } from "../services/user.service.js";



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
                