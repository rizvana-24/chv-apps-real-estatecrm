import express from "express";

import Enquiry from "../models/Enquiry.js";

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
    Enquiry,
    "customer agent property"
  )
);

router.get(
  "/:id",
  protect,
  getOne(
    Enquiry,
    "customer agent property"
  )
);

router.post(
  "/",
  protect,
  createOne(Enquiry)
);

router.patch(
  "/:id",
  protect,
  updateOne(Enquiry)
);

router.delete(
  "/:id",
  protect,
  deleteOne(Enquiry)
);

export default router;
