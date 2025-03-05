import {z} from "zod";

export const attendanceSchema = z.object({
    employeeId :z.number().min(1, "Employee ID must be at least 1"),
    date :z.string().min(10, "Date must be at least 10 characters long"),
    checkIn :z.string().min(10, "Check-in time must be at least 10 characters long"),
    checkOut :z.string().min(10, "Check-out time must be at least 10 characters long"),
    status :z.string().min(1, "Status must be at least 1 characters long"),
});