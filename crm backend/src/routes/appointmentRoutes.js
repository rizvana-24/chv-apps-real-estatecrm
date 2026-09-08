import express from "express";

import Appointment from "../models/Appointment.js";

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
    Appointment,
    "customer agent property"
  )
);

router.get(
  "/:id",
  protect,
  getOne(
    Appointment,
    "customer agent property"
  )
);

router.post(
  "/",
  protect,
  createOne(Appointment)
);

router.patch(
  "/:id",
  protect,
  updateOne(Appointment)
);

router.delete(
  "/:id",
  protect,
  deleteOne(Appointment)
);

export default router;
