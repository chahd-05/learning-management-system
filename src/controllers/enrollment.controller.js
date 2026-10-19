import { enrollCourse } from "../services/enrollment.service.js";

export const enrollCourseController = async (req, res, next) => {
    try {
        
        const learnerId = req.user.userId;
        
        const courseId = req.params.courseId;
        
        const enroll =  await enrollCourse(learnerId,courseId)
        
        return res.status(201).json({
            success: true,
            message: "Enrollment created successfully",
            data: enroll
        })
    } catch (error) {
        next(error);
    }
};