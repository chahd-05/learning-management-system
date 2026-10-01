import express from "express"
import
{
getCourses,
getCourse,
filterCoursesController,
sortCoursesController
} from "../controllers/course.controller.js"



const router = express.Router();

router.get("/", getCourses)
router.post("/filter", filterCoursesController);
router.get("/sort", sortCoursesController);
router.get("/:id",getCourse)
export default router;