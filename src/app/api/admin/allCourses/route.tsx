//return all courses

import { NextResponse } from "next/server";
import { connectDB } from "@/db";
import Course from "@/app/models/courseModel";

connectDB();
export async function GET() {
  try {
    const courses = await Course.find({});
    const returnedCourses = courses.map((course) => ({
      id: course._id.toString(),
      title: course.title,
      image: course.image,
    }));
    return NextResponse.json({ returnedCourses }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch courses", error },
      { status: 500 }
    );
  }
}
