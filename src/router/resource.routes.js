import express from "express";

import {
    getResourcesByModuleController
} from "../controllers/resource.controller.js";

const router = express.Router();

/**
 * @swagger
 * /resources/module/{moduleId}:
 *   get:
 *     summary: Get all resources of a module
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *         example: 68f123456789012345678901
 *     responses:
 *       200:
 *         description: Resources retrieved successfully
 */
router.get(
    "/module/:moduleId",
    getResourcesByModuleController
);

export default router;