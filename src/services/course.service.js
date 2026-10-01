import Course from "../models/Course.js";

export const getAllCourses = async () => {
    return await Course.find({ status: "published" });
};
export const getCourseById = async (id) => {
    return await Course.findById(id);
};
