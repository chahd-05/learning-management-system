
import Module from "../models/Module.js";
import Enrollment from "../models/Enrollment.js";
import Progression from "../models/Progression.js";
import Resource from "../models/Resource.js";

export const getModulesByOrder = async (courseId) => {
    return await Module.find({
        courseId,
        status: "published"
    }).sort({ order: 1 });
};

export const isLearnerEnrolled = async (learnerId, courseId) => {
    const enrollment = await Enrollment.findOne({
        learnerId,
        courseId,
        status: "active"
    });

    return enrollment !== null;
};

export const isModuleCompleted = async (learnerId, courseId, moduleId) => {
    const progression = await Progression.findOne({
        learnerId,
        courseId,
        moduleId,
        completed: true
    });

    return progression !== null;
};

export const isPreviousModuleCompleted = async (
    learnerId,
    courseId,
    moduleId
) => {
    const modules = await getModulesByOrder(courseId);

    const currentIndex = modules.findIndex(
        (module) => module._id.toString() === moduleId.toString()
    );

    if (currentIndex === -1) {
        return false;
    }

    if (currentIndex === 0) {
        return true;
    }

    const previousModule = modules[currentIndex - 1];

    return await isModuleCompleted(
        learnerId,
        courseId,
        previousModule._id
    );
};

export const getAccessibleModule = async (learnerId, courseId) => {
    const enrolled = await isLearnerEnrolled(learnerId, courseId);

    if (!enrolled) {
        return null;
    }

    const modules = await getModulesByOrder(courseId);

    for (const module of modules) {
        const completed = await isModuleCompleted(
            learnerId,
            courseId,
            module._id
        );

        if (!completed) {
            return module;
        }
    }

    return null;
};

export const completeModule = async (learnerId, courseId, moduleId) => {
    const enrolled = await isLearnerEnrolled(learnerId, courseId);

    if (!enrolled) {
        return {
            success: false,
            status: 403,
            message: "You are not enrolled in this course"
        };
    }

    const module = await Module.findOne({
        _id: moduleId,
        courseId,
        status: "published"
    });

    if (!module) {
        return {
            success: false,
            status: 404,
            message: "Module not found or not published"
        };
    }

    const previousCompleted = await isPreviousModuleCompleted(
        learnerId,
        courseId,
        moduleId
    );

    if (!previousCompleted) {
        return {
            success: false,
            status: 403,
            message: "Complete the previous module first"
        };
    }

    let progression = await Progression.findOne({
        learnerId,
        courseId,
        moduleId
    });

    if (progression && progression.completed) {
        return {
            success: true,
            message: "Module already completed",
            data: progression
        };
    }

    if (!progression) {
        progression = new Progression({
            learnerId,
            courseId,
            moduleId
        });
    }

    progression.completed = true;
    progression.completedAt = new Date();

    await progression.save();

    return {
        success: true,
        message: "Module completed successfully",
        data: progression
    };
};

export const markResourceAsViewed = async (
    learnerId,
    courseId,
    moduleId,
    resourceId
) => {
    const enrolled = await isLearnerEnrolled(learnerId, courseId);

    if (!enrolled) {
        return {
            success: false,
            status: 403,
            message: "You are not enrolled in this course"
        };
    }

    const module = await Module.findOne({
        _id: moduleId,
        courseId,
        status: "published"
    });

    if (!module) {
        return {
            success: false,
            status: 404,
            message: "Module not found or not published"
        };
    }

    const previousCompleted = await isPreviousModuleCompleted(
        learnerId,
        courseId,
        moduleId
    );

    if (!previousCompleted) {
        return {
            success: false,
            status: 403,
            message: "Complete the previous module first"
        };
    }

    const resource = await Resource.findOne({
        _id: resourceId,
        moduleId
    });

    if (!resource) {
        return {
            success: false,
            status: 404,
            message: "Resource not found in this module"
        };
    }

    let progression = await Progression.findOne({
        learnerId,
        courseId,
        moduleId
    });

    if (!progression) {
        progression = new Progression({
            learnerId,
            courseId,
            moduleId,
            viewResources: [resourceId]
        });

        await progression.save();
    } else if (
        !progression.viewResources.some(
            (id) => id.toString() === resourceId.toString()
        )
    ) {
        progression.viewResources.push(resourceId);
        await progression.save();
    }

    return {
        success: true,
        message: "Resource marked as viewed",
        data: progression
    };
};

export const getModuleStatus = async(learnerId, courseId, moduleId) => {
    const enrolled = await isLearnerEnrolled(learnerId, courseId)

    if(!enrolled) {
        return {
            status: "locked",
            message: "you are not enrolled in this course"
        }
    }

    const modules = await getModulesByOrder(courseId)

    const moduleExists = module.some(
        (module) => module._id.toString() === moduleId.toString()
    )
    if(!moduleExists) {
        return {
            status: "not_found",
            message: "module not found or not published"
        }
    }

    const completed = await isModuleCompleted(
        learnerId,
        courseId,
        moduleId
    )
    if(completed) {
        return {status: "completed"}
    }

    const previousCompleted = await isPreviousModuleCompleted(
        learnerId,
        courseId, 
        moduleId
    )

    if(!previousCompleted) {
        return { status: "locked"}
    }
    const progression = await Progression.findOne({
        learnerId,
        courseId,
        moduleId
    })

    if(progression && progression.viewResources.length > 0){
        return {status: "in progress"}
    }
    
    return {
        status: "accessible"
    }
}
