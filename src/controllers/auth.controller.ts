import { Request, Response , RequestHandler} from "express";
import { loginUser } from "../services/auth.service";
import { loginSchema } from "../validators/auth.validator";


export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validasi input dengan Zod
    const validatedData = loginSchema.parse(req.body);

    const { token, user } = await loginUser(validatedData.username, validatedData.password);

     res.status(200).json({ message: "Login berhasil", token, user });
  } catch (error) {
     res.status(400).json({
      message: error instanceof Error ? error.message : "Terjadi kesalahan",
    });
  }
};
