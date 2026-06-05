import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: true,
    },

    businessName: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    products: {
      type: String,
    },

    social: {
      type: String,
    },

    extraTable: {
      type: String,
      default: "No",
    },

    terms: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);