import { Router } from "express";
import { getAll, getById,create, update, destroy } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";



const router = Router();


router.get("/", authMiddleware, roleMiddleware("admin"), getAll);
router.get("/:id", authMiddleware, roleMiddleware("admin"), getById);
router.post("/", authMiddleware, roleMiddleware("admin"), create);
router.put("/:id", authMiddleware, roleMiddleware("admin"), update);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), destroy);


export default router;