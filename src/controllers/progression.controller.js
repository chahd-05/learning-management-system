import { completeModule, markResourceAsViewed, getCourseProgress } from "../services/progression.service.js";

export const completeModuleController = async (req, res, next) => {
    try {
        const {courseId, moduleId} = req.params
        const learnerId = req.user.userId

        const result = await completeModule(
            learnerId,
            courseId, 
            moduleId
        )

        if(!result.success) {
            return res.status(result.status).json({
                success: false,
                message: result.message
            })
        }

        return res.status(200).json({
            success: true,
            message: result.message,
            data: result.data || null
        })
    } catch(error) {
        return next(error)
    }
}

export const markResourceAsViewedController = async (req, res, next) => {
    try {
        const {courseId, moduleId, resourceId} = req.params
        const learnerId = req.user.userId

        const result = await markResourceAsViewed(
            learnerId,
            courseId,
            moduleId,
            resourceId
        )

        if(!result.success) {
            return res.status(result.status).json({
                success: false,
                message: result.message
            })
        }

        return res.status(200).json({
            success: true,
            message: result.message,
            data: result.data
        })
    } catch(error) {
        return next(error)
    }
}

export const getCourseProgressController = async (req, res, next) => {
    try {
        const { courseId } = req.params
        const learnerId = req.user.userId
        
        const result = await getCourseProgress(learnerId, courseId)

        if(!result.success) {
            return res.status(result.status).json({
                success: false,
                message: result.message
            })
        }
        return res.status(200).json({
            success: true,
            data: result.data
        })
    } catch(error) {

        return next(error)
    }
}