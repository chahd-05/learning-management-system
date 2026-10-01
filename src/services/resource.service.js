import Resource from "../models/Resource.js";

export const getResourcesByModule = async (moduleId) => {
    return await Resource.find({
        moduleId: moduleId
    }).sort({ order: 1 });
};