import Resource from "../models/Resource.js";
import Module from "../models/Module.js";

export const getResourcesByModule = async (moduleId) => {
    return await Resource.find({
        moduleId: moduleId
    }).sort({ order: 1 });
};
export const createResource = async (moduleId, data) => {
    const module = await Module.findById(moduleId);

    if (!module) {
        return null;
    }

    return await Resource.create({
        ...data,
        moduleId
    });
};
