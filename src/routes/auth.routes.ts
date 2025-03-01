import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { refreshTokenMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();


router.post("/login", login);
router.post("/register", register);
router.post("/refresh-token", refreshTokenMiddleware);



export default router;