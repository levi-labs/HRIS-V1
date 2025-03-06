import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import departmentRoutes  from "./department.routes.js";
import jobPositionRoutes from "./jobPosition.routes.js";
import employeeRoutes from "./employee.routes.js";
import attendanceRoutes from "./attendance.routes.js";
import officeRoutes from "./office.routes.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/department", departmentRoutes);
router.use("/job-position", jobPositionRoutes);
router.use("/employee", employeeRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/office", officeRoutes);


export default router;