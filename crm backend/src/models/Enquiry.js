import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true
    },

    status: {
      type: String,
      enum: [
        "Awaiting",
        "Answered",
        "Closed"
      ],
      default: "Awaiting"
    },

    message: String,

    latestUpdate: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Enquiry",
  enquirySchema
);
