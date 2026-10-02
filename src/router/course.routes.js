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
/**
 * @swagger
 * /courses/filter:
 *   post:
 *     summary: Filter courses by category and level
 *     tags: [Courses]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: Backend
 *               level:
 *                 type: string
 *                 example: beginner
 *     responses:
 *       200:
 *         description: Courses filtered successfully
 */
router.post("/filter", filterCoursesController);
router.get("/sort", sortCoursesController);
router.get("/search", searchCourse);
/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *       404:
 *         description: Course not found
 */
router.get("/:id",getCourse)
export default router;