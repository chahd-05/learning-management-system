import express from "express"
import
{
getCourses,
getCourse,
filterCoursesController
} from "../controllers/course.controller.js"



const router = express.Router();

router.get("/", getCourses)
router.get("/:id",getCourse)
router.post("/filter", filterCoursesController);

export default router;