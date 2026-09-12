import express from "express";

import SiteVisit from "../models/SiteVisit.js";
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
    SiteVisit,
    "customer agent property"
  )
);

router.get(
  "/:id",
  protect,
  getOne(
    SiteVisit,
    "customer agent property"
  )
);

router.post(
  "/",
  protect,
  createOne(SiteVisit)
);

router.patch(
  "/:id",
  protect,
  updateOne(SiteVisit)
);

router.delete(
  "/:id",
  protect,
  deleteOne(SiteVisit)
);

export default router;
