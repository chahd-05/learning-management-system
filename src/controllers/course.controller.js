import { getAllCourses } from "../services/course.service.js";



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