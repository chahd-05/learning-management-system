import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";
import {
    getModulesByCourseController,
    createModuleController,
    updateModuleController,
    deleteModuleController
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

router.post(
    "/create/:courseId",
    authenticate,
    authorizeRoles("formateur", "admin"),
    createModuleController
);

router.patch(
    "/update/:courseId/:moduleId",
    authenticate,
    authorizeRoles("formateur", "admin"),
    updateModuleController
);

router.delete(
    "/delete/:courseId/:moduleId",
    authenticate,
    authorizeRoles("formateur", "admin"),
    deleteModuleController
);

export default router;