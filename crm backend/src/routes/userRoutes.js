import express from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.js";

import {
  protect,
  authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorize(
    "super-admin",
    "admin"
  ),
  async (req, res) => {

    const users =
      await User
        .find()
        .select("-password")
        .sort({
          createdAt: -1
        });

    res.json(users);
  }
);

router.get(
  "/:id",
  protect,
  async (req, res) => {

    const user =
      await User
        .findById(req.params.id)
        .select("-password");

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);
  }
);

router.post(
  "/",
  protect,
  authorize(
    "super-admin",
    "admin"
  ),
  async (req, res) => {

    const {
      name,
      email,
      password,
      role,
      phone,
      region,
      status
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(
        password || "ChangeMe123",
        12
      );

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        phone,
        region,
        status
      });

    const data =
      user.toObject();

    delete data.password;

    res.status(201).json(data);
  }
);

router.patch(
  "/:id",
  protect,
  authorize(
    "super-admin",
    "admin"
  ),
  async (req, res) => {

    const data = {
      ...req.body
    };

    if (data.password) {

      data.password =
        await bcrypt.hash(
          data.password,
          12
        );
    }

    const user =
      await User
        .findByIdAndUpdate(
          req.params.id,
          data,
          {
            new: true,
            runValidators: true
          }
        )
        .select("-password");

    res.json(user);
  }
);

router.delete(
  "/:id",
  protect,
  authorize("super-admin"),
  async (req, res) => {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "User deleted successfully"
    });
  }
);

export default router;
