import
{
getModulesByCourse
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