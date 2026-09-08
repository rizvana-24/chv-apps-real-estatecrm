import mongoose from "mongoose";

const siteVisitSchema = new mongoose.Schema(
  {
    when: {
      type: Date,
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

    location: String,

    status: {
      type: String,
      enum: [
        "Confirmed",
        "Awaiting confirm",
        "Requested",
        "Completed",
        "No-show",
        "Rescheduled"
      ],
      default: "Requested"
    },

    feedback: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "SiteVisit",
  siteVisitSchema
);