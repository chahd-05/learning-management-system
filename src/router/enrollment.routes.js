import express from "express";
import { enrollCourseController } from "../controllers/enrollment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import {authorizeRoles} from "../middlewares/authorizeRoles.middleware.js"

const router = express.Router();



router.post("/:courseId",
authenticate,
authorizeRoles("apprenant"),
enrollCourseController)

export default router;