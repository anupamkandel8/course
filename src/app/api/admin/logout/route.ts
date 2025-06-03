import { NextResponse } from 'next/server';

export async function POST() {
  // Set the 'adminToken' cookie to an empty value and expire it
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("adminToken", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}