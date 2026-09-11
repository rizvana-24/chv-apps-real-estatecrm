import express from "express";

import Lead from "../models/Lead.js";

import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
} from "../controllers/crudController.js";

import {
  protect
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getAll(
    Lead,
    "owner customer property"
  )
);

router.get(
  "/:id",
  protect,
  getOne(
    Lead,
    "owner customer property"
  )
);

router.post(
  "/",
  protect,
  createOne(Lead)
);

router.patch(
  "/:id",
  protect,
  updateOne(Lead)
);

router.delete(
  "/:id",
  protect,
  deleteOne(Lead)
);

export default router;
