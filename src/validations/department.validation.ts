import {z} from "zod";


export const createDepartmentSchema = z.object({
    name :z.string().min(2, "Name must be at least 2 characters long"),
    phone :z.string().min(9, "Phone must be at least 9 characters long"),
    address :z.string().min(6, "Address must be at least 6 characters long"),
});
