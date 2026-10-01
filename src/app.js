import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import CourseRoutes from "./router/course.routes.js"
import {errorHandler} from "./middlewares/error.middleware.js";
import moduleRoutes from "./router/models.routes.js";

dotenv.config()

const app = express();
connectDB()

app.use(express.json())
app.use("/courses", CourseRoutes)
app.use("/modules", moduleRoutes);
app.use(errorHandler)

app.listen(3500,()=>{
    console.log("Server runinig in port 3500")
})
