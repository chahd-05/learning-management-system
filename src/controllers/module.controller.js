import {
    getModulesByCourse,
    createModule,
    updateModule,
    deleteModule
} from "../services/module.service.js";


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
        const trainerId = req.user.userId;

        if (req.user.role !== "formateur") {
            return res.status(403).json({
                success: false,
                message: "Only trainers can create modules"
            });
        }

        const {
            title,
            description,
            order,
            estimatedDuration,
            status
        } = req.body;

        const module = await createModule(courseId, trainerId, {
            title,
            description,
            order,
            estimatedDuration,
            status
        });

        if (!module) {
            return res.status(404).json({
                success: false,
                message: "Course not found for this trainer"
            });
        }

        return res.status(201).json({
            success: true,
            message: "Module created successfully",
            data: module
        });

    } catch (error) {
        next(error);
    }
};


export const updateModuleController = async (req, res, next) => {
    try {
        const { moduleId, courseId } = req.params;
        const trainerId = req.user.userId;

        if (req.user.role !== "formateur") {
            return res.status(403).json({
                success: false,
                message: "Only trainers can update modules"
            });
        }

        const {
            title,
            description,
            order,
            estimatedDuration,
            status
        } = req.body;

        const module = await updateModule(moduleId, courseId, trainerId, {
            title,
            description,
            order,
            estimatedDuration,
            status
        });

        if (!module) {
            return res.status(404).json({
                success: false,
                message: "Module not found for this trainer"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Module updated successfully",
            data: module
        });

    } catch (error) {
        next(error);
    }
};


export const deleteModuleController = async (req, res, next) => {
    try {
        const { moduleId, courseId } = req.params;
        const trainerId = req.user.userId;

        if (req.user.role !== "formateur") {
            return res.status(403).json({
                success: false,
                message: "Only trainers can delete modules"
            });
        }

        const module = await deleteModule(moduleId, courseId, trainerId);

        if (!module) {
            return res.status(404).json({
                success: false,
                message: "Module not found for this trainer"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Module deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};