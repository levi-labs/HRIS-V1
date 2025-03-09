import {z} from "zod";


export const leaveRequestSchema = z.object({
    employeeId :z.number().min(1, "Employee ID must be at least 1"),
    startDate :z.string().min(10, "Start date must be at least 10 characters long"),
    endDate :z.string().min(10, "End date must be at least 10 characters long"),
    reason :z.string().min(3, "Reason must be at least 3 characters long"),
});