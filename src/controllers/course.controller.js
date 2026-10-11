import
{
getAllCourses,
getCourseById,
filterCourses,
sortCourses,
searchCourses,
createCourse,
updateCourse,
changeCourseStatus
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

export const createCourseController = async (req, res, next) => {
    try {
        const trainerId = req.params.trainerId;

        const {
            title,
            shortDescription,
            description,
            objectives,
            prerequisites,
            level,
            category,
            estimatedDuration
        } = req.body;

        const course = await createCourse({
            title,
            shortDescription,
            description,
            objectives,
            prerequisites,
            level,
            category,
            estimatedDuration
        }, trainerId);
        if (!trainerId) {
            return res.status(404).json({
                success: false,
                message: "user not found for this "
            });
        }

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            data: course
        });

    } catch (error) {
        next(error);
    }
};
export const updateCourseController = async (req, res, next) => {
    try {
        const { courseId, trainerId } = req.params;

        const {
            title,
            shortDescription,
            description,
            objectives,
            prerequisites,
            level,
            category,
            estimatedDuration
        } = req.body;

        const course = await updateCourse(
            courseId,
            trainerId,
            {
                title,
                shortDescription,
                description,
                objectives,
                prerequisites,
                level,
                category,
                estimatedDuration
            }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found for this trainer"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: course
        });

    } catch (error) {
        next(error);
    }
};
export const changeCourseStatusController = async (req, res, next) => {
    try {
        const { courseId, trainerId } = req.params;
        const { status } = req.body;

        const course = await changeCourseStatus(
            courseId,
            trainerId,
            status
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found for this trainer"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course status updated successfully",
            data: course
        });

    } catch (error) {
        next(error);
    }
};
