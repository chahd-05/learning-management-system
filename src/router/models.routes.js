import express from "express";

import {
    getModulesByCourseController
} from "../controllers/module.controller.js";

const router = express.Router();

router.get(
    "/course/:courseId",
    getModulesByCourseController
);

export default router;