import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db"; // Adjust path as needed
import User from "@/models/userModel"; // Adjust path as needed
import { tokenToName } from "@/utl/tokenTo";

export async function POST(req: NextRequest) {
  try {
    const { courseId } = await req.json();
    console.log("Received courseId:", courseId);
    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }
    // Decode token (assumes tokenToName is extracting from headers/cookies)
    const decoded = await tokenToName("user");
    const username = decoded.username;
    console.log("decoted un: ", username); // come here check
    // Connect to DB
    await connectDB();
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Add courseId only if not already present
    console.log("User courses before adding:", user.courses);
    if (!user.courses.includes(courseId)) {
      user.courses.push(courseId);
      await user.save();
    }
    console.log("User courses after adding:", user.courses);
    return NextResponse.json({
      message: "Course added successfully",
      courses: user.courses,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
