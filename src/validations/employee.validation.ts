import {z} from "zod";

export const employeeSchema = z.object({
    first_name :z.string().min(3, {message : "First name must be at least 3 characters long"}),
    last_name :z.string().min(3, {message : "Last name must be at least 3 characters long"}),
    job_position_id :z.number().min(1, {message : "Job position ID must be at least 1"}),
    userId :z.number().min(1, {message : "User ID must be at least 1"}),
    office_id :z.number().min(1, {message : "Office ID must be at least 1"})
});