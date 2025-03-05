import { Router } from "express";
import { index, show, create, update, destroy } from "../controllers/attendance.controller.js";
const router = Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;