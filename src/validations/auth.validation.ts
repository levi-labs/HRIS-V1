import {z} from "zod";

export const loginSchema = z.object({
    username :z.string().min(3, {message : "Username must be at least 3 characters long"}),
    password :z.string().min(6, {message : "Password must be at least 6 characters long"})
});

export const registerSchema = z.object({
    name :z.string().min(3, "Name must be at least 3 characters long"),
    username :z.string().min(3, "Username must be at least 3 characters long"),
    email :z.string().email("Invalid email format"),
    password :z.string().min(6, "Password must be at least 6 characters long")
});