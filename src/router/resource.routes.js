import express from "express";

import {
    getResourcesByModuleController,
    createResourceController
} from "../controllers/resource.controller.js";

import { upload } from "../middlewares/upload.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

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
 *     responses:
 *       200:
 *         description: Resources retrieved successfully
 */
router.get(
    "/module/:moduleId",
    getResourcesByModuleController
);

router.post(
    "/create/:moduleId",
    authenticate,
    upload.single("file"),
    createResourceController
);

export default router;