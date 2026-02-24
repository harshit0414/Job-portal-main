import mongoose from "mongoose";
import dotenv from "dotenv";
import { Job } from "./models/job.model.js";
import { Company } from "./models/company.model.js";
import { User } from "./models/user.model.js";

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected ✅");

        // Clear old data (optional)
        await Job.deleteMany();
        await Company.deleteMany();
        await User.deleteMany();

        // 1️⃣ Create Recruiter User
        // Create recruiter user first
        const recruiter = await User.create({
            fullname: "Admin Recruiter",
            email: "admin@test.com",
            phoneNumber: 9876543210,
            password: "123456",
            role: "recruiter"
        });

        // Create companies (IMPORTANT: use userId not created_by)
        const google = await Company.create({
            name: "Google",
            description: "Tech giant company",
            location: "Bangalore",
            website: "https://google.com",
            userId: recruiter._id   // ✅ MUST MATCH SCHEMA
        });

        const amazon = await Company.create({
            name: "Amazon",
            description: "E-commerce giant",
            location: "Hyderabad",
            website: "https://amazon.com",
            userId: recruiter._id   // ✅ MUST MATCH SCHEMA
        });

        // 3️⃣ Create Jobs
        await Job.insertMany([
            {
                title: "Frontend Developer",
                description: "React developer required",
                requirements: ["React", "JavaScript", "Tailwind"],
                salary: 8,
                experienceLevel: 1,
                location: "Bangalore",
                jobType: "Full-Time",
                position: 2,
                company: google._id,
                created_by: recruiter._id
            },
            {
                title: "Backend Developer",
                description: "Node + MongoDB backend developer",
                requirements: ["Node.js", "Express", "MongoDB"],
                salary: 10,
                experienceLevel: 2,
                location: "Hyderabad",
                jobType: "Full-Time",
                position: 3,
                company: amazon._id,
                created_by: recruiter._id
            },
            {
                title: "Full Stack Developer",
                description: "MERN stack developer required",
                requirements: ["React", "Node.js", "MongoDB"],
                salary: 12,
                experienceLevel: 2,
                location: "Remote",
                jobType: "Remote",
                position: 1,
                company: google._id,
                created_by: recruiter._id
            },
            {
                title: "React Developer",
                description: "Looking for React developer with strong hooks knowledge.",
                requirements: ["React", "JavaScript", "Redux", "Tailwind"],
                salary: 9,
                experienceLevel: 2,
                location: "Bangalore",
                jobType: "Full-Time",
                position: 3,
                company: google._id,
                created_by: recruiter._id
            },
            {
                title: "Node.js Backend Engineer",
                description: "Build scalable REST APIs using Node and MongoDB.",
                requirements: ["Node.js", "Express", "MongoDB", "JWT"],
                salary: 11,
                experienceLevel: 2,
                location: "Hyderabad",
                jobType: "Full-Time",
                position: 2,
                company: amazon._id,
                created_by: recruiter._id
            },
            {
                title: "MERN Stack Developer",
                description: "Work on full stack development with React & Node.",
                requirements: ["React", "Node.js", "MongoDB", "Redux"],
                salary: 12,
                experienceLevel: 3,
                location: "Remote",
                jobType: "Remote",
                position: 1,
                company: google._id,
                created_by: recruiter._id
            },
            {
                title: "Frontend Intern",
                description: "Paid internship for frontend development.",
                requirements: ["HTML", "CSS", "JavaScript"],
                salary: 3,
                experienceLevel: 0,
                location: "Delhi",
                jobType: "Internship",
                position: 5,
                company: amazon._id,
                created_by: recruiter._id
            },
            {
                title: "DevOps Engineer",
                description: "Manage CI/CD pipelines and AWS infrastructure.",
                requirements: ["AWS", "Docker", "Kubernetes", "CI/CD"],
                salary: 15,
                experienceLevel: 4,
                location: "Pune",
                jobType: "Full-Time",
                position: 2,
                company: google._id,
                created_by: recruiter._id
            },
            {
                title: "UI/UX Designer",
                description: "Design modern UI for web applications.",
                requirements: ["Figma", "Adobe XD", "User Research"],
                salary: 7,
                experienceLevel: 1,
                location: "Mumbai",
                jobType: "Full-Time",
                position: 1,
                company: amazon._id,
                created_by: recruiter._id
            },
            {
                title: "Python Backend Developer",
                description: "Develop backend services using Django/FastAPI.",
                requirements: ["Python", "Django", "PostgreSQL"],
                salary: 10,
                experienceLevel: 2,
                location: "Chennai",
                jobType: "Full-Time",
                position: 2,
                company: google._id,
                created_by: recruiter._id
            },
            {
                title: "Data Analyst",
                description: "Analyze business data and generate insights.",
                requirements: ["SQL", "Excel", "Power BI"],
                salary: 8,
                experienceLevel: 1,
                location: "Noida",
                jobType: "Full-Time",
                position: 2,
                company: amazon._id,
                created_by: recruiter._id
            }
        ]);

        console.log("Mock Data Inserted Successfully 🚀");
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

seedData();