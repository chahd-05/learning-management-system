import { getAllCourses,getCourseById } from "../services/course.service.js";





export const getCourses = async (req, res) => {
    try {
        const courses = await getAllCourses();
        res.status(200).json({
            "success": true,
            "data": {
                courses
            },
            "message": "Courses retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch courses",
            error: error.message
        });
    }
}
export const getCourse = async (req,res) => {
    try {

        const course = await getCourseById(req.params.id);
        res.status(200).json({
            "success": true,
            "data": {
                course
            },
            "message": "Course retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch courses",
            error: error.message
        });
    }
}