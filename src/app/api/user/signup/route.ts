import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/db";
import bcrypt from "bcrypt";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists." },
        { status: 409 }
      );
    }

    // Hash and salt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error.", error: (error as Error).message },
      { status: 500 }
    );
  }
}
