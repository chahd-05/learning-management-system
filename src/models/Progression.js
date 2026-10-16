import mongoose from "mongoose";

const proressionSchema = new mongoose.Schema(
    {
        learnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Module",
            required: true
        },
        completedAt: {
            type: Date,
            default: null
        },
        viewResources: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Resourses"
            }
        ]
    },
    {
        timestamps: true
    }
);

proressionSchema.index(
    {learnerId: 1, courseId: 1, moduleId: 1},
    {unique: true}
)

const Progression = mongoose.model(
    "progression",
    proressionSchema
)

export default Progression;