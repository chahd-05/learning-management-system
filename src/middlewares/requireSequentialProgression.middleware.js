import Module from "../models/Module.js";
import { isPreviousModuleCompleted } from "../services/progression.service.js";

export const requireSequentialProgression = async (req, res, next) => {
    try {
        const {moduleId} = req.params
        const learnerId = req.user.userId

        const module = await Module.findOne({
            _id: moduleId,
            status: "published"
        })

        if(!module) {
            return res.status(404).json({
                success: false,
                message: "module not found or not published"
            })
        }
        const courseId = module.courseId

        const previousCompleted = await isPreviousModuleCompleted(learnerId, courseId, module._id)
        if(!previousCompleted) {
            return res.status(403).json({
                success: false,
                message: "access denied. complete your previous module first"
            })
        }

        req.module = module

        return next()

    } catch(error) {

        return next(error)
    }
}
