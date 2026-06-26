import mongoose from "mongoose";


const GallerySchema = new mongoose.Schema(
  {
    exhibitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exhibition",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GallerySchema);
