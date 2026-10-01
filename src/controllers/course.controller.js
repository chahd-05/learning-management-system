import
{
getAllCourses,
getCourseById,
filterCourses,
sortCourses,
searchCourses
} from "../services/course.service.js";



export const getCourses = async (req, res, next) => {
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
        next(error);
    }
}
export const getCourse = async (req, res, next) => {
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
        next(error);
    }
}

export const filterCoursesController = async (req, res, next) => {
    try {
        const { category, level } = req.body;

        const courses = await filterCourses(category, level);

        res.status(200).json({
            success: true,
            message: "Courses filtered successfully",
            data: courses
        });

    } catch (error) {
        next(error);
    }
};

export const sortCoursesController = async (req, res, next) => {
    try {
        const courses = await sortCourses();

        res.status(200).json({
            success: true,
            message: "Courses sorted successfully",
            data: courses
        });
    } catch (error) {
        next(error);
    }
};

export const searchCourse = async (req, res, next) => {
    try {
        const courses = await searchCourses(req.query.keyword);

        res.status(200).json({
            success: true,
            message: "Courses searched successfully",
            data: courses
        });
    } catch (error) {
        next(error);
    }
};

