import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
    {
        learnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },

        enrolledAt: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: ["active", "completed"],
            default: "active"
        },

        progressPercent: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        }
    },
    {
        timestamps: true
    }
);

// enrollmentSchema.index(
//     { learnerId: 1, courseId: 1 },
//     { unique: true }
// );

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;