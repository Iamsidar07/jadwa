import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPath = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicPath = publicPath.includes(pathname);
  const token = request.cookies.get("token")?.value || "";
  const loggedIn = request.nextUrl.searchParams.get("loggedIn");

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if ((!token && !isPublicPath && !loggedIn) || (!token && loggedIn)) {
    return NextResponse.redirect(new URL("/register", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/blog/:path*", "/login", "/register"],
};
