import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: [
        "Apartment",
        "Villa",
        "Plot",
        "Office",
        "Land",
        "Other"
      ],
      default: "Apartment"
    },

    bhk: String,

    areaSqft: Number,

    city: String,

    locality: String,

    price: {
      type: Number,
      required: true
    },

    priceLabel: String,

    status: {
      type: String,
      enum: [
        "Available",
        "Reserved",
        "Draft",
        "Sold"
      ],
      default: "Available"
    },

    tag: String,

    verified: {
      type: Boolean,
      default: false
    },

    description: String,

    images: [String],

    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    enquiriesCount: {
      type: Number,
      default: 0
    },

    visitsCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Property",
  propertySchema
);