import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {

  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

export const register = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
      role = "customer",
      phone
    } = req.body;

    if (!name || !email || !password) {

      return res.status(400).json({
        message:
          "Name, email and password are required"
      });
    }

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(409).json({
        message: "Email already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      status:
        role === "customer"
          ? "Verified"
          : "Pending KYC"
    });

    res.status(201).json({
      message: "Registration successful",
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

export const login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User
        .findOne({ email })
        .select("+password");
    console.log("LOGIN EMAIL:", email);
    console.log("USER FOUND:", !!user);
    console.log("PASSWORD HASH EXISTS:", !!user? true : false);

    if (!user) {

      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
    console.log("LOGIN EMAIL:", email);
    console.log("USER FOUND:", !!user);
    console.log("PASSWORD HASH EXISTS:", !!user? true : false);
    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );
     console.log("PASSWORD MATCH:",validPassword); 

    if (!validPassword) {

      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    user.lastSeen = new Date();

    await user.save();

    res.json({
      message: "Login successful",

      token: generateToken(user),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

export const getMe = async (
  req,
  res
) => {

  res.json({
    user: req.user
  });
};