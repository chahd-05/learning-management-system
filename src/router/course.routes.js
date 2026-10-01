import express from "express"
import { getCourses } from "../controllers/course.controller.js"



const router = express.Router();

router.get("/", getCourses)

export default router;