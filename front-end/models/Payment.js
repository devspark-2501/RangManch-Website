import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
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
    transactionId: {
      type: String,
      required: true,
      trim: true,
    },
    paymentScreenshot: {
      type: String, // base64 or URL
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending Verification", "Paid", "Rejected"],
      default: "Pending Verification",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);