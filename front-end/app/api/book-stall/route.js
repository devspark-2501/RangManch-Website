// This route is now a no-op stub kept for backwards compatibility only.
// All booking creation is handled by:
//   POST /api/razorpay/create-order   — create Razorpay order + capacity check
//   POST /api/razorpay/verify-payment — verify signature + create Booking + Payment
//
// Do NOT delete this file — removing the route would cause 404 errors on
// any cached or bookmarked old requests. It simply returns a redirect hint.

export async function POST() {
  return Response.json(
    {
      success: false,
      message:
        "This endpoint is deprecated. Use /api/razorpay/create-order and /api/razorpay/verify-payment.",
    },
    { status: 410 }
  );
}