import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        order: {
            type: Number,
            required: true,
            min: 1
        },

        estimatedDuration: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            required: true,
            enum: ["draft", "published", "archived"]
        }
    },
    {
        timestamps: true
    }
);

const Module = mongoose.model("Module", moduleSchema);

export default Module;