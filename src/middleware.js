import { NextResponse } from "next/server";

export async function middleware(req) {
  const adminToken = req.cookies.get("adminToken")?.value;
  const userToken = req.cookies.get("userToken")?.value;
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !pathname.startsWith("/admin/signup")
  ) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    // Allow access to admin profile if adminToken exists
    else {
      return NextResponse.next();
    }
  } else if (adminToken && pathname === "/") {
    return NextResponse.redirect(new URL("/admin/profile", req.url));
  } else if (
    pathname.startsWith("/user") &&
    !pathname.startsWith("/user/login") &&
    !pathname.startsWith("/user/signup")
  ) {
    if (!userToken) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  } else if (userToken && pathname === "/") {
    return NextResponse.redirect(new URL("/user/profile", req.url));
  }
}

export const config = {
  matcher: "/:path*",
};
