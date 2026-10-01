import dotenv from "dotenv";
import mongoose from "mongoose";
import Course from "../src/models/Course.js";
import Module from "../src/models/Module.js";

dotenv.config();

const seedCourses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Course.deleteMany();
        await Module.deleteMany();

        const courses = [
            {
                title: "JavaScript Fundamentals",
                shortDescription: "Learn the basics of JavaScript",
                description: "A course to learn JavaScript fundamentals.",
                objectives: [
                    "Understand JavaScript basics",
                    "Work with functions",
                    "Manipulate arrays and objects"
                ],
                prerequisites: [],
                level: "beginner",
                category: "Programming",
                estimatedDuration: 20,
                status: "published",
                trainerId: new mongoose.Types.ObjectId(),
                publishedAt: new Date()
            },
            {
                title: "Node.js & Express",
                shortDescription: "Build APIs with Node.js and Express",
                description: "Learn how to create REST APIs using Node.js and Express.",
                objectives: [
                    "Understand Node.js",
                    "Create Express APIs",
                    "Handle HTTP requests"
                ],
                prerequisites: ["JavaScript basics"],
                level: "intermediate",
                category: "Backend",
                estimatedDuration: 25,
                status: "published",
                trainerId: new mongoose.Types.ObjectId(),
                publishedAt: new Date()
            }
        ];

        const createdCourses = await Course.insertMany(courses);

        console.log("Courses seeded successfully");

        const modules = [
            {
                courseId: createdCourses[0]._id,
                title: "JavaScript Basics",
                description: "Learn variables, data types and operators.",
                order: 1,
                estimatedDuration: 5,
                status: "published"
            },
            {
                courseId: createdCourses[0]._id,
                title: "Functions",
                description: "Learn how to create and use functions.",
                order: 2,
                estimatedDuration: 6,
                status: "published"
            },
            {
                courseId: createdCourses[1]._id,
                title: "Node.js Fundamentals",
                description: "Understand Node.js and its main concepts.",
                order: 1,
                estimatedDuration: 8,
                status: "published"
            },
            {
                courseId: createdCourses[1]._id,
                title: "Express.js",
                description: "Build REST APIs with Express.js.",
                order: 2,
                estimatedDuration: 10,
                status: "published"
            }
        ];

        await Module.insertMany(modules);

        console.log("Modules seeded successfully");

    } catch (error) {
        console.error("Seed failed:", error.message);
    } finally {
        await mongoose.connection.close();
    }
};

seedCourses();