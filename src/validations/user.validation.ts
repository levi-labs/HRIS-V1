import {z} from "zod";

export const userSchema = z.object({
    username :z.string().min(3, {message : "Username must be at least 3 characters long"}),
    email :z.string().email("Invalid email format"),
    password :z.string().min(6, {message : "Password must be at least 6 characters long"}),
    roleId :z.number().min(1, {message : "Role ID must be at least 1"}),
    job_position_id :z.number().min(1, {message : "Job position ID must be at least 1"}),
    office_id :z.number().min(1, {message : "Office ID must be at least 1"})
    
});