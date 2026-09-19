import { NextRequest, NextResponse } from "next/server";
import { verify } from "@/lib/session";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login endpoint must stay reachable while unauthenticated.
  if (pathname === "/api/admin/login") return NextResponse.next();

  const token = req.cookies.get("modestframes_admin")?.value;
  const payload = await verify<{ admin: boolean }>(token);

  if (!payload?.admin) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/api/admin/:path*"],
};
