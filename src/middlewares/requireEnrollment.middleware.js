import Enrollment from "../models/Enrollment.js";

export const requireEnrollment = async (req, res, next) => {
    try{
        const learnerId = req.user.userId;
        
        const courseId = req.params.courseId;
        
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