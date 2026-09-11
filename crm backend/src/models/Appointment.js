import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    when: {
      type: Date,
      required: true
    },

    type: {
      type: String,
      enum: [
        "Site visit",
        "Video call",
        "Document signing",
        "Valuation",
        "Call"
      ],
      default: "Site visit"
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
      ref: "Property"
    },

    status: {
      type: String,
      enum: [
        "Confirmed",
        "Pending",
        "Awaiting confirm",
        "Rescheduled",
        "Cancelled",
        "Completed"
      ],
      default: "Pending"
    },

    notes: String,

    durationMinutes: {
      type: Number,
      default: 30
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Appointment",
  appointmentSchema
);
