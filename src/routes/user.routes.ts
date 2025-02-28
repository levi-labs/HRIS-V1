import { Router } from "express";
import { getAll, getById } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";



const router = Router();


router.get("/", authMiddleware, getAll);
router.get("/:id", authMiddleware, getById);

export default router;