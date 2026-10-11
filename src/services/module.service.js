import Module from "../models/Module.js";


export const getModulesByCourse = async (courseId) => {
    return await Module.find({
        courseId: courseId
    }).sort({ order: 1 });
};
export const createModule = async (courseId, data) => {
    return await Module.create({
        ...data,
        courseId
    });
};
export const updateModule = async (moduleId, courseId, data) => {
    return await Module.findOneAndUpdate(
        {
            _id: moduleId,
            courseId: courseId
        },
        data,
        {
            new: true,
            runValidators: true
        }
    );
};