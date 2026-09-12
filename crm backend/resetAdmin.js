import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const password = await bcrypt.hash("Admin@123", 12);

const user = await User.findOneAndUpdate(
  { email: "mohammadrizvana24@gmail.com" },
  {
    name: "Admin",
    email: "mohammadrizvana24@gmail.com",
    password: password,
    role: "admin",
    status: "Active"
  },
  {
    new: true,
    upsert: true
  }
);

console.log("ADMIN RESET:", user ? "SUCCESS" : "FAILED");

await mongoose.disconnect();