import express from "express";

import {
    getResourcesByModuleController
} from "../controllers/resource.controller.js";

const router = express.Router();

router.get(
    "/module/:moduleId",
    getResourcesByModuleController
);

export default router;