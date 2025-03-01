import { Router } from "express";
import { getAll, getById } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";



const router = Router();


router.get("/", authMiddleware, roleMiddleware("admin"), getAll);
router.get("/:id", authMiddleware, roleMiddleware("admin"), getById);

export default router;