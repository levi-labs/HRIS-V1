import { Request, Response , RequestHandler} from "express";
import { loginUser, registerUser } from "../services/auth.service.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import { ZodError } from "zod";


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validasi input dengan Zod
    const validatedData = loginSchema.parse(req.body);

    const { token, user } = await loginUser(validatedData.username, validatedData.password);

     res.status(200).json({ message: "Login Successfully", token, user });
  } catch (error) {
     res.status(400).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validasi input dengan Zod
    const validatedData = registerSchema.parse(req.body);
   
    const user = await registerUser(
        validatedData.name,
        validatedData.username,
        validatedData.email, 
        validatedData.password
    );

    res.status(201).json({ message: "Register Successfully", user });
  } catch (error) {
    if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
            field:err.path.join("."),
            message:err.message,
        }));
       res.status(422).json({
        message: "Validation Error",
        error: errorMessages,
      });
    }
    res.status(500).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
}