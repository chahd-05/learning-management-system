import Module from "../models/Module";
import Enrollment from "../models/Enrollment"

export const getModulesByOrder = async(courseId) => {
    return await Module.find({
        courseId: courseId,
        status: "published"
    }).sort({order : 1 })
} 

export const isLearnerEnrolled = async(learnerId, courseId) => {
    const enrollment = await Enrollment.findOne({
        learnerId: learnerId,
        courseId: courseId,
        status: "active"
    })
    return enrollment !== null
}

export const isModuleCompleted = async(learnerId, courseId, moduleId) => {
    const progression = await Progression.findOne({
        learnerId: learnerId,
        courseId: courseId,
        moduleId: moduleId,
        completed: true
    })
    return progression !== null
}