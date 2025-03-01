import { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateAccessToken } from "../utils/tokenUtils.js";

dotenv.config();
interface User{
    id:number,
    role:string
}
export interface AuthRequest extends Request {
    cookies: {
        refresh_token: string
    }
    user?:User;
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

export const refreshTokenMiddleware = (req:AuthRequest, res:Response, next:NextFunction) => {
    try {
        const token = req.cookies.refresh_token;

        if(!token){
          res.status(401).json({ message: "Unauthorized, Refresh token not found" });
          return;
        }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "",(err:jwt.VerifyErrors | null,user:any) => {
        if(err){
            return res.status(401).json({ message: "Refresh token is expired or invalid" });
        }
        req.user = {
            id : user.id,
            role : user.role
        };
        if(!user){
            return res.status(401).json({ message: "Unauthorized" });
        }
        const newAccessToken = generateAccessToken({id : user.id, role : user.role});
        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "Refresh token is valid" });

        return next();
    });
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}
