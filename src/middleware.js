import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request) {
  const token = request.cookies.get("next-auth.session-token");
  const currentUrl = request.nextUrl.pathname;
  if (!token) return NextResponse.rewrite(new URL("/login", request.url));
  return NextResponse.next();

  
}
export const config = {
  matcher: ['/login','/','/Subjectonexam/:path*']
}

