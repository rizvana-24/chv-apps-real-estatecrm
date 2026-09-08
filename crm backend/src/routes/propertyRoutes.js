import express from "express";

import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty
} from "../controllers/propertyController.js";

import {
  protect,
  authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getProperties
);

router.get(
  "/:id",
  protect,
  getProperty
);

router.post(
  "/",
  protect,
  authorize(
    "super-admin",
    "admin",
    "agent"
  ),
  createProperty
);

router.patch(
  "/:id",
  protect,
  authorize(
    "super-admin",
    "admin",
    "agent"
  ),
  updateProperty
);

router.delete(
  "/:id",
  protect,
  authorize(
    "super-admin",
    "admin"
  ),
  deleteProperty
);

export default router;
