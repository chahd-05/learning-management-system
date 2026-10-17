import Module from "../models/Module.js";
import Course from "../models/Course.js";

export const getModulesByCourse = async (courseId) => {
    return await Module.find({
        courseId: courseId
    }).sort({ order: 1 });
};
export const createModule = async (courseId, trainerId, data) => {
    const course = await Course.findOne({
        _id: courseId,
        trainerId: trainerId
    })
    if(!course){
        return null
    }

    return await Module.create({
        ...data,
        courseId
    });
};
export const updateModule = async (moduleId, courseId, trainerId, data) => {
    const course = await Course.findOne({
        _id: courseId,
        trainerId: trainerId
    })
    if(!course) {
        return null
    }

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
export const deleteModule = async (moduleId, courseId, trainerId) => {
    const course = await Course.findOne({
        _id: courseId,
        trainerId: trainerId
    })
    if(!course) {
        return null
    }

    return await Module.findOneAndDelete({
        _id: moduleId,
        courseId: courseId
    });
};