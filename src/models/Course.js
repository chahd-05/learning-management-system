import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        shortDescription: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        objectives: {
            type: [String],
            default: [],
        },

        prerequisites: {
            type: [String],
            default: [],
        },

        level: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },

        estimatedDuration: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            required: true,
            enum: ["draft", "published", "archived"],
        },

        trainerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        publishedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timeseries: true,
    },
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
