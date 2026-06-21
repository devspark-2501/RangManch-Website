import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null, // null until booking is actually created (idempotent path)
    },
    exhibitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exhibition",
      required: true,
    },
    vendorName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    // ── Razorpay fields ──────────────────────────────────────────────────
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true, // ← critical: makes booking creation idempotent.
                    // Webhook and verify-payment both try to create a
                    // Payment for the same orderId; Mongo rejects the
                    // second insert with E11000, which we catch and
                    // treat as "already handled" rather than an error.
    },
    razorpayPaymentId: {
      type: String,
      default: "",
    },
    razorpaySignature: {
      type: String,
      default: "",
    },
    paymentStatus: {
      type: String,
      enum: ["Created", "Paid", "Failed", "Refunded"],
      default: "Created",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);