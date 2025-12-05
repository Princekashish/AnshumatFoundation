import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  if (pathname === "/dashboard" && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Optional: if the user is logged in and goes to /login, redirect to dashboard
  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Allow request to continue if token exists
  return NextResponse.next();
}

// Apply middleware only to /dashboard and /login routes
export const config = {
  matcher: ["/dashboard", "/"],
};
