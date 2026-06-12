import mongoose from "mongoose";

const ExhibitionSchema = new mongoose.Schema(
  {
    title: String,

    location: String,

    date: String,

    time: String,

    description: String,

    image: String,

    status: {
      type: String,
      enum: ["open", "coming-soon", "expired"],
      default: "coming-soon",
    },

    gallery: [String],
  },
  {
    timestamps: true,
  }
); // updated file!!

export default mongoose.models.Exhibition ||
  mongoose.model("Exhibition", ExhibitionSchema);
