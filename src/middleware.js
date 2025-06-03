import { NextResponse } from "next/server";

export async function middleware(req) {
  const adminToken = req.cookies.get("adminToken")?.value;

  if (!adminToken) {
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  //website that needs middleware
  matcher: ["/admin/profile"],
};
