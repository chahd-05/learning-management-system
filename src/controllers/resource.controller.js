import
{
getResourcesByModule
} from "../services/resource.service.js";

export const getResourcesByModuleController = async (req, res, next) => {
    try {
        const resources = await getResourcesByModule(req.params.moduleId);

        res.status(200).json({
            success: true,
            message: "Resources retrieved successfully",
            data: resources
        });
    } catch (error) {
        next(error);
    }
};