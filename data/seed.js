import dotenv from "dotenv";
import mongoose from "mongoose";
import Course from "../src/models/Course.js";

dotenv.config();

const seedCourses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Course.deleteMany();

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

        await Course.insertMany(courses);

        console.log("Courses seeded successfully");

    } catch (error) {
        console.error("Seed failed:", error.message);
    } finally {
        await mongoose.connection.close();
    }
};

seedCourses();