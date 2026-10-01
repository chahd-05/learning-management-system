import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import CourseRoutes from "./router/course.routes.js"
dotenv.config()

const app = express();
connectDB()

app.use(express.json())
app.use("/courses", CourseRoutes)

app.listen(3500,()=>{
    console.log("Server runinig in port 3500")
})
