import { Router } from "express";
import { index, show, destroy, checkIn, checkOut } from "../controllers/attendance.controller.js";
const router = Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", checkIn);
router.put("/:id", checkOut);
router.delete("/:id", destroy);

export default router;