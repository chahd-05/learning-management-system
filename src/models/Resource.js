import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
    {
        moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        type: {
            type: String,
            required: true,
            enum: ["video", "pdf", "link", "file"]
        },

        urlOrStorageRef: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        originalFileName: {
            type: String,
            default: null,
            trim: true
        },

        fileSize: {
            type: Number,
            default: null,
            min: 0
        },

        estimatedDuration: {
            type: Number,
            default: null,
            min: 0
        },

        order: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        timestamps: true
    }
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;