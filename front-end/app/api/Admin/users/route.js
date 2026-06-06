import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find({})
      .sort({ createdAt: -1 });

    return Response.json(users);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}