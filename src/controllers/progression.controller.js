import { completeModule } from "../services/progression.service.js";

export const completeModuleController = async (req, resizeBy, next) => {
    try {
        const {courseId, moduleId} = req.params
        const learnerId = req.user.courseId

        const result = await completeModule(
            learnerId,
            courseId, 
            moduleId
        )

        if(!result.success) {
            return resizeBy.status(result.status).json({
                success: false,
                message: result.message
            })
        }

        return resizeBy.status(200).json({
            success: true,
            message: result.message,
            data: result.data || null
        })
    } catch(error) {
        return next(error)
    }
}