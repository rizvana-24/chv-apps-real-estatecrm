import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      sparse: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: [
        "super-admin",
        "admin",
        "agent",
        "customer"
      ],
      required: true
    },

    phone: String,

    region: String,

    status: {
      type: String,
      enum: [
        "Active",
        "Verified",
        "Pending KYC",
        "Blocked",
        "Invited",
        "Suspended"
      ],
      default: "Active"
    },

    permissions: [String],

    lastSeen: Date
  },
  {
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
