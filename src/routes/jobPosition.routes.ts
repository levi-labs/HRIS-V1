import { Router } from "express";
import { index,show,create,update,destroy } from "../controllers/jobPosition.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();


router.get("/",authMiddleware, roleMiddleware("admin"), index);
router.get("/:id", show);
router.post("/", authMiddleware, roleMiddleware("admin"), create);
router.put("/:id", authMiddleware, roleMiddleware("admin"), update);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), destroy);

export default router;