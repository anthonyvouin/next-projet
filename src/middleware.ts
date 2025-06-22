import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  
  if (!isAuthenticated && (pathname.startsWith("/profile") || pathname.startsWith("/admin"))) {
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  if (pathname.startsWith("/admin")) {
    if (token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
  
  if (isAuthenticated && pathname === "/") {
    if (token.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    } else {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*", "/admin/:path*"],
}; 