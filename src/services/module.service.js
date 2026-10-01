import Module from "../models/Module.js";


export const getModulesByCourse = async (courseId) => {
    return await Module.find({
        courseId: courseId
    }).sort({ order: 1 });
};