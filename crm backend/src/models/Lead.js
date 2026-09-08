import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    source: {
      type: String,
      enum: [
        "Website",
        "Portal",
        "Referral",
        "Walk-in",
        "Campaign",
        "Other"
      ],
      default: "Website"
    },

    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    stage: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Site visit",
        "Negotiation",
        "Won",
        "Lost"
      ],
      default: "New"
    },

    nextAction: String,

    sla: String,

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Lead || mongoose.model("Lead", leadSchema);
