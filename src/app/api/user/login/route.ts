import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/db";
import User from "@/models/userModel.js";

let userToken;

export async function POST(req: NextRequest) {
  await connectDB();
  const { username, password } = await req.json();

  // Find user by username
  const user = await User.findOne({ username });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate JWT userToken
  userToken = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  // Set userToken in HTTP-only cookie
  const response = NextResponse.json(
    { message: "Login successful" },
    { status: 200 }
  );

  // Set the cookie with appropriate options
  response.cookies.set("userToken", userToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });
  return response;
}

export async function GET(req: NextRequest) {
  const userToken = req.cookies.get("userToken")?.value;
  if (!userToken) {
    return NextResponse.json({ error: "No user token found" }, { status: 401 });
  }
  return NextResponse.json({ userToken }, { status: 200 });
}