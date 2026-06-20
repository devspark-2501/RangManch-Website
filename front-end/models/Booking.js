import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    // ── Vendor Info ──────────────────────────────────────────────────────
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
    terms: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Pending",
    },

    // ── Exhibition Link ──────────────────────────────────────────────────
    exhibitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exhibition",
      required: true,
    },
    exhibitionTitle: {
      type: String,
      required: true,
    },

    // ── Pricing ──────────────────────────────────────────────────────────
    entryCost: {
      type: Number,
      default: 0,
    },
    extraTableCost: {
      type: Number,
      default: 0,
    },
    extraTableCount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);