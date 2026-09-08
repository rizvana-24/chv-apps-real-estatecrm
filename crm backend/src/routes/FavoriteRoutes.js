import express from "express";

import Favorite from "../models/Favorite.js";

import {
  protect
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  async (req, res) => {

    const favorites =
      await Favorite
        .find({
          customer: req.user._id
        })
        .populate("property");

    res.json(favorites);
  }
);

router.post(
  "/:propertyId",
  protect,
  async (req, res) => {

    const favorite =
      await Favorite.findOneAndUpdate(
        {
          customer: req.user._id,
          property: req.params.propertyId
        },
        {
          customer: req.user._id,
          property: req.params.propertyId
        },
        {
          upsert: true,
          new: true
        }
      ).populate("property");

    res.status(201).json(favorite);
  }
);

router.delete(
  "/:propertyId",
  protect,
  async (req, res) => {

    await Favorite.findOneAndDelete({
      customer: req.user._id,
      property: req.params.propertyId
    });

    res.json({
      message:
        "Removed from favorites"
    });
  }
);

export default router;
