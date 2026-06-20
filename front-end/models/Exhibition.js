import mongoose from "mongoose";

const ExhibitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    // Stall Charges
    entryCost: {
      type: Number,
      required: true,
      default: 0,
    },

    extraTableCost: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      enum: ["open", "coming-soon", "expired"],
      default: "coming-soon",
    },

    gallery: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Exhibition ||
  mongoose.model("Exhibition", ExhibitionSchema);