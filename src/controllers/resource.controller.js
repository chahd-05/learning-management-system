import
{
getResourcesByModule,
createResource
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
export const createResourceController = async (req, res, next) => {
    try {
        const { moduleId } = req.params;

        const {
            title,
            type,
            urlOrStorageRef,
            description,
            estimatedDuration,
            order
        } = req.body;

        const resource = await createResource(moduleId, {
            title,
            type,
            urlOrStorageRef: req.file ? req.file.path : urlOrStorageRef,
            description,
            originalFileName: req.file ? req.file.originalname : null,
            fileSize: req.file ? req.file.size : null,
            estimatedDuration,
            order
        });

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Module not found"
            });
        }

        return res.status(201).json({
            success: true,
            message: "Resource created successfully",
            data: resource
        });

    } catch (error) {
        next(error);
    }
};