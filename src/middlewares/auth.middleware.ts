import { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface AuthRequest extends Request {
    user?:{
        id:number,
        role:string
    };
}

export const authMiddleware = (req:AuthRequest, res:Response, next:NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            throw new Error("Unauthorized");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "") as {id:number, role:string};
        req.user = {
            id : decodedToken.id,
            role : decodedToken.role
        };
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}
