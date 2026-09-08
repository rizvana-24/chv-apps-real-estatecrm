import express from "express";

import Message from "../models/Message.js";

import {
  protect
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  async (req, res) => {

    const filter = {
      $or: [
        {
          sender: req.user._id
        },
        {
          receiver: req.user._id
        }
      ]
    };

    const messages =
      await Message
        .find(filter)
        .populate(
          "sender receiver property"
        )
        .sort({
          createdAt: 1
        });

    res.json(messages);
  }
);

router.post(
  "/",
  protect,
  async (req, res) => {

    const {
      receiver,
      text,
      property
    } = req.body;

    if (!receiver || !text) {

      return res.status(400).json({
        message:
          "Receiver and text are required"
      });
    }

    const message =
      await Message.create({
        sender: req.user._id,
        receiver,
        text,
        property
      });

    const result =
      await message.populate(
        "sender receiver property"
      );

    res.status(201).json(result);
  }
);

router.patch(
  "/:id/read",
  protect,
  async (req, res) => {

    const message =
      await Message.findOneAndUpdate(
        {
          _id: req.params.id,
          receiver: req.user._id
        },
        {
          read: true
        },
        {
          new: true
        }
      );

    res.json(message);
  }
);

export default router;
