import {z,ZodType} from "zod";

export const officeSchema = z.object({
    name :z.string().min(3, {message : "Name must be at least 3 characters long"}),
    latitude :z.number().min(1, {message : "Latitude must be at least 1"}),
    longitude :z.number().min(1, {message : "Longitude must be at least 1"}),
});