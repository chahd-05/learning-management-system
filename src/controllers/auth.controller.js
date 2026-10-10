import { registerUser } from "../services/auth.service";

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
            success: false,
            message: "account created successfully"
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