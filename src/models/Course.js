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
            trim: true,
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
            default: "draft",
        },

        trainerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        publishedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;