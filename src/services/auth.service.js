import bcrypt from "bcryptjs";
import User from "../models/User";


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