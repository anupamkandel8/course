import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db";
import Course from "@/app/models/courseModel";

connectDB();
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, image } = body;

    if (!title) {
      return NextResponse.json({ error: "Missing title" }, { status: 400 });
    }
    const newCourse = new Course({ title, image: image || "" });
    newCourse.save();

    return NextResponse.json(
      { message: "Course added successfully", course: newCourse },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
