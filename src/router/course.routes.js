import express from "express"
import
{
getCourses,
getCourse,
filterCoursesController,
sortCoursesController,
searchCourse
} from "../controllers/course.controller.js"



const router = express.Router();



/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all published courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 */
router.get("/", getCourses)
router.post("/filter", filterCoursesController);
router.get("/sort", sortCoursesController);
router.get("/search", searchCourse);
router.get("/:id",getCourse)
export default router;