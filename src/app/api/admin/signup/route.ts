import { NextRequest, NextResponse } from "next/server";
import Admin from "@/app/models/adminModel";
import { connectDB } from "@/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDB();
let adminToken

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

     
      return NextResponse.json(
        { message: "Admin created successfully." },
        { status: 201 }
      );
    } catch (error) {
        return NextResponse.json(
            { message: "Server error.", error: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    const adminToken = req.cookies.get("adminToken")?.value;
    if (!adminToken) {
        return NextResponse.json({ error: "No admin token found" }, { status: 401 });
    }
    return NextResponse.json({ adminToken }, { status: 200 });
}