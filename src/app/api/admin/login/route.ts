import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/db";
import Admin from "@/app/models/adminModel";

connectDB();

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Find admin by username
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate JWT adminToken
  const adminToken = jwt.sign(
    { adminId: admin._id, username: admin.username },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  // Set adminToken in HTTP-only cookie
  const response = NextResponse.json(
    { message: "Login successful", adminToken },
    { status: 200 }
  );
  response.cookies.set("adminToken", adminToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });
  return response;
}
