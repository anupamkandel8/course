import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db"; // Adjust path as needed
import User from "@/models/userModel"; // Adjust path as needed
import { tokenToName } from "@/utl/tokenTo";
import course from "@/models/courseModel";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    // Decode token (assumes tokenToName is extracting from headers/cookies)
    const decoded = await tokenToName("user");
    const username = decoded.username || 'user'; //come here

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch courses bought by the user
    const courses = await course.find({ _id: { $in: user.courses } });

    return NextResponse.json({
      message: "Courses fetched successfully",
      courses,
      user: {
        name: user.username,
    }});
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
