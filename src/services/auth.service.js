import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


export const registerUser = async(fullName, email, password) => {
    const normalizedEmail = email.trim().toLowerCase()

    const existingUser = await User.findOne({
        email: normalizedEmail
    })

    if(existingUser) {
        const error = new Error("email already exist")
        error.statusCode = 409
        throw error
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
        fullName: fullName.trim(),
        email: normalizedEmail,
        passwordHash
    })

    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status
    }
}


export const loginUser = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
        email: normalizedEmail
    });

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    if (user.status !== "active") {
        const error = new Error("Account is not active");
        error.statusCode = 403;
        throw error;
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    return {
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        }
    };
};


export const getUserProfile = async (userId) => {
    const user = await User.findById(userId).select(
        "fullName email role status createdAt"
    );

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt
    };
};