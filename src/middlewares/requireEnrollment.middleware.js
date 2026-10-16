
import Enrollment from "../models/Enrollment.js";
import Module from "../models/Module.js";

export const requireEnrollment = async (req, res, next) => {
    try {
        const learnerId = req.user.userId;
        let courseId = req.params.courseId;

        if (!courseId && req.params.moduleId) {
            const module = await Module.findById(req.params.moduleId);

            if (!module) {
                return res.status(404).json({
                    success: false,
                    message: "Module not found"
                });
            }

            courseId = module.courseId;
        }

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID or Module ID is required"
            });
        }

        const activeEnrollment = await Enrollment.findOne({
            learnerId,
            courseId,
            status: "active"
        });

        if (!activeEnrollment) {
            return res.status(403).json({
                success: false,
                message: "You are not enrolled in this course"
            });
        }

        return next();
    } catch (error) {
        return next(error);
    }
};
