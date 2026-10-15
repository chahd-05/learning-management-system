import Module from "../models/Module";

export const getModulesByOrder = async(courseId) => {
    return await Module.find({
        courseId: courseId,
        status: "published"
    }).sort({order : 1 })
} 