import { Router } from "express";
import { index, create } from "../controllers/leaveRequest.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/", index);
router.post("/",authMiddleware, create);