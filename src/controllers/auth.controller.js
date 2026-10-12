import { registerUser, loginUser, getUserProfile } from "../services/auth.service.js";

export const register = async (req, res, next) => {
    try {
        const {fullName, email, password} = req.body

        if(typeof fullName !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !fullName.trim() ||
            !email.trim() ||
            !password
        ){
            return res.status(400).json({
                success: false,
                message: "fullName, email, password are required"
            })
        }

        const user = await registerUser(fullName, email, password)

        return res.status(201).json({
            success: true,
            message: "account created successfully",
            user
        })
    } catch(error){
        if(error.statusCode === 409) {
            return res.status(409).json({
                success: false,
                message: error.message
            })
        }
        next(error)
    } 
}


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const result = await loginUser(email, password);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            ...result
        });
    } catch (error) {
        if (error.statusCode === 401 || error.statusCode === 403) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            });
        }

        next(error);
    }
};


export const getMyProfile = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const user = await getUserProfile(userId);

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        if (error.statusCode === 404) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        next(error);
    }
};