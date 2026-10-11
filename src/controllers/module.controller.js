import
{
getModulesByCourse,
createModule
} from "../services/module.service.js"


export const getModulesByCourseController = async (req, res, next) => {
    try {
        const modules = await getModulesByCourse(req.params.courseId);

        res.status(200).json({
            success: true,
            message: "Modules retrieved successfully",
            data: modules
        });
    } catch (error) {
        next(error);
    }
};
export const createModuleController = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const {
            title,
            description,
            order,
            estimatedDuration,
            status
        } = req.body;

        const module = await createModule(courseId, {
            title,
            description,
            order,
            estimatedDuration,
            status
        });

        return res.status(201).json({
            success: true,
            message: "Module created successfully",
            data: module
        });

    } catch (error) {
        next(error);
    }
};