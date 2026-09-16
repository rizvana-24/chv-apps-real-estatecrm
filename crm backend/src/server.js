import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes
  from "./routes/authRoutes.js";

import userRoutes
  from "./routes/userRoutes.js";

import propertyRoutes
  from "./routes/propertyRoutes.js";

import leadRoutes
  from "./routes/leadRoutes.js";

import appointmentRoutes
  from "./routes/appointmentRoutes.js";

import enquiryRoutes
  from "./routes/enquiryRoutes.js";

import favoriteRoutes
  from "./routes/FavoriteRoutes.js";

import siteVisitsRoutes 
from "./routes/SiteVisitsRoutes.js";


import messageRoutes
  from "./routes/messageRoutes.js";

import reportRoutes
  from "./routes/reportRoutes.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const app = express();


const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:8080"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  })
);
app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(morgan("dev"));

app.get(
  "/api/health",
  (req, res) => {

    res.json({
      success: true,
      message:
        "Real Estate CRM API is running"
    });
  }
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/properties",
  propertyRoutes
);

app.use(
  "/api/leads",
  leadRoutes
);

app.use(
  "/api/appointments",
  appointmentRoutes
);

app.use(
  "/api/enquiries",
  enquiryRoutes
);

app.use(
  "/api/favorites",
  favoriteRoutes
);

app.use(
  "/api/site-visits",
   siteVisitsRoutes);


app.use(
  "/api/messages",
  messageRoutes
);

app.use(
  "/api/reports",
  reportRoutes
);

app.use(
  (err, req, res, next) => {

    console.error(err);

    res.status(500).json({
      message:
        err.message ||
        "Internal server error"
    });
  }
);

const PORT =
  process.env.PORT || 5000;

  app.get("/", (req, res) => {
    res.send("Real Estate CRM Backend is running successfully!");
  });

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  }
);
