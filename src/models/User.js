import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        passwordHash: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["apprenant", "formateur", "admin"],
            default: "apprenant"
        },

        status: {
            type: String,
            enum: ["active", "inactive", "blocked"],
            default: "active"
        },
    },

        {
        timestamps: true
        }
    
);

const User = mongoose.model("User", userSchema);

export default User; 