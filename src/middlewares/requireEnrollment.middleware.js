import Enrollment from "../models/Enrollment.js";

export const requireEnrollment = async (req, res, next) => {
    try{
        const learnerId = res.user.userId

        
        const courseId = res.params.courseId
        
        const activeEnrollment = await Enrollment.findOne({
                learnerId,
                courseId,
                status: "active"
        })
        
        if(!activeEnrollment){
            return res.status(403).json({
                success: false,
                message: "your not Enroll"
            });
        }

        return next();

    } catch (error) {
        next(error);
    }
};