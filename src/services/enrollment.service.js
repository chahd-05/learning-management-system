import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollCourse = async (learnerId, courseId) => {

    const course = await Course.findOne({
        _id : courseId,
        status: "published"
    })
    if(!course){
        throw new Error("Cours cant found")
    }
    

    const enrollment = await Enrollment.findOne({
        courseId: courseId,
        learnerId: learnerId
    })
    if(enrollment){
        throw new Error("Already enrolled");
    }

    return await Enrollment.create({
        learnerId: learnerId,
        courseId: courseId,
    })
};
