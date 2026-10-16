import express from "express"
import { authenticate } from "../middlewares/auth.middleware.js"
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js"
import { completeModuleController, markResourceAsViewedController } from "../controllers/progression.controller.js"

const router = express.Router()

router.patch(
    "/courses/:courseId/modules/:moduleId/complete",
    authenticate,
    authorizeRoles("apprenant"),
    completeModuleController
)

router.patch(
    "/courses/:courseId/modules/:moduleId/resources/:resourceId/view",
    authenticate,
        authorizeRoles("apprenant"),
        markResourceAsViewedController
)

export default router;