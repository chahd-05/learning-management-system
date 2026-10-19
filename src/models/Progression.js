import mongoose from "mongoose";

const progressionSchema = new mongoose.Schema(
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
        moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Module",
            required: true
        }, 
        completed: {
            type: Boolean,
            default: false
        },
        completedAt: {
            type: Date,
            default: null
        },
        viewResources: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Resource"
            }
        ]
    },
    {
        timestamps: true
    }
);

progressionSchema.index(
    {learnerId: 1, courseId: 1, moduleId: 1},
    {unique: true}
)

const Progression = mongoose.model(
    "Progression",
    progressionSchema
)

export default Progression;
