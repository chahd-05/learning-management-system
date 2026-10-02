import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import CourseRoutes from "./router/course.routes.js"
import {errorHandler} from "./middlewares/error.middleware.js";
import moduleRoutes from "./router/models.routes.js";
import resourceRoutes from "./router/resource.routes.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
dotenv.config()

const app = express();
connectDB()

app.use(express.json())
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/courses", CourseRoutes)
app.use("/modules", moduleRoutes);
app.use("/resources", resourceRoutes);
app.use(notFound)
app.use(errorHandler)

app.listen(3500,()=>{
    console.log("Server runinig in port 3500")
})
