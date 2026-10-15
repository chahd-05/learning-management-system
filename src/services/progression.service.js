import Module from "../models/Module";
import Enrollment from "../models/Enrollment"
import Progression from "../models/Progression";

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

export const isPreviousModuleCompleted = async(learnerId, courseId, moduleId) => {
    const modules = await getModulesByOrder(courseId)
    const currentIndex = modules.findIndex(
        (module) => module._id.toString() === moduleId.toString()
    )
    if(currentIndex === -1) {
        return false
    }
    if(currentIndex === 0) {
        return true
    }
    const previousModule = modules[currentIndex -1]
     return await isModuleCompleted(learnerId, courseId, previousModule._id)
}

export const getAccessibleModule = async(learnerId, courseId) => {
    const enrolled = await isLearnerEnrolled(learnerId, courseId)
    if(!enrolled) {
        return null
    }
    const modules = await getModulesByOrder(courseId)

    for(const module of modules) {
        const completed = await isModuleCompleted(
            learnerId, 
            courseId, 
            module._id)
            if(!completed) {
                return module
            }
    }
    return null
}