import express from "express";

import {
  dashboard,
  leadPipeline
} from "../controllers/reportController.js";

import {
  protect,
  authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorize(
    "super-admin",
    "admin",
    "agent"
  ),
  dashboard
);

router.get(
  "/lead-pipeline",
  protect,
  authorize(
    "super-admin",
    "admin",
    "agent"
  ),
  leadPipeline
);

export default router;
