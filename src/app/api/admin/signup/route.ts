import { NextRequest, NextResponse } from "next/server";
import Admin from "@/app/models/adminModel";
import { connectDB } from "@/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use env var in production

export async function POST(req: NextRequest) {
    try {
      const { username, password } = await req.json();

      if (!username || !password) {
        return NextResponse.json(
          { message: "Username and password are required." },
          { status: 400 }
        );
      }

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return NextResponse.json(
          { message: "Admin already exists." },
          { status: 409 }
        );
      }

      // Hash and salt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new admin
      const newAdmin = new Admin({ username, password: hashedPassword });
      await newAdmin.save();

      // Generate JWT adminToken
      const adminToken = jwt.sign(
        { id: newAdmin._id, username: newAdmin.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      const response = NextResponse.json(
        { message: "Signup successful", adminToken },
        { status: 201 }
      );
      response.cookies.set("adminToken", adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });
      return response;
    } catch (error) {
        return NextResponse.json(
            { message: "Server error.", error: (error as Error).message },
            { status: 500 }
        );
    }
}
