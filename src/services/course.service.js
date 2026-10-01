import Course from "../models/Course.js";

export const getAllCourses = async () => {
    return await Course.find({ status: "published" });
};

export const getCourseById = async (id) => {
    return await Course.findById(id);
};


export const filterCourses = async (category, level) => {
    const filter = {
        status: "published"
    };

    if (category) {
        filter.category = category;
    }

    if (level) {
        filter.level = level;
    }

    return await Course.find(filter);
};

export const sortCourses = async () => {
    return await Course.find({
        status: "published"
    }).sort({ publishedAt: -1 });
};
