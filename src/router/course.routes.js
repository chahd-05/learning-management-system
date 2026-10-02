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
/**
 * @swagger
 * /courses/sort:
 *   get:
 *     summary: Sort courses by newest
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Courses sorted successfully
 */
router.get("/sort", sortCoursesController);
/**
 * @swagger
 * /courses/search:
 *   get:
 *     summary: Search courses by keyword
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         example: javascript
 *     responses:
 *       200:
 *         description: Courses searched successfully
 */
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