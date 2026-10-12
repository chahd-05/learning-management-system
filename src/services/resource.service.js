import Resource from "../models/Resource.js";
import Module from "../models/Module.js";
import Course from "../models/Course.js";

export const getResourcesByModule = async (moduleId) => {
    return await Resource.find({
        moduleId: moduleId
    }).sort({ order: 1 });
};

export const createResource = async (moduleId, trainerId, data) => {
    const module = await Module.findById(moduleId);

    if (!module) {
        return null;
    }

    const course = await Course.findOne({
        _id: module.courseId,
        trainerId: trainerId
    });

    if (!course) {
        return null;
    }

    return await Resource.create({
        ...data,
        moduleId
    });
};