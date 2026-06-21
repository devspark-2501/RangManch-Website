import mongoose from "mongoose";

const CategoryLimitSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    maxSlots: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

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

    // Per-exhibition vendor categories and their stall slot limits.
    // Replaces the old hardcoded category dropdown — admin defines
    // categories and capacity individually for each exhibition.
    categoryLimits: {
      type: [CategoryLimitSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Exhibition ||
  mongoose.model("Exhibition", ExhibitionSchema);