import express from "express";

import {
getModulesByCourseController,
createModuleController
} from "../controllers/module.controller.js";

const router = express.Router();


/**
 * @swagger
 * /modules/course/{courseId}:
 *   get:
 *     summary: Get all modules of a course
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         example: 68f123456789012345678901
 *     responses:
 *       200:
 *         description: Modules retrieved successfully
 */
router.get(
    "/course/:courseId",
    getModulesByCourseController
);
router.post("/create/:courseId", createModuleController);

export default router;