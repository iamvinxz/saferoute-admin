import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/maps", "/notification"];
const AUTH_ROUTES = ["/auth/login"];
const ADMIN_ONLY_ROUTES = ["/users"];
const RESCUER_ONLY_ROUTES = ["/rescues"];

export default function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isAdminOnly = ADMIN_ONLY_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isRescuerOnly = RESCUER_ONLY_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // role-based protection
  if (token && (isAdminOnly || isRescuerOnly)) {
    try {
      const decoded = jwtDecode<{ role: string }>(token);
      const role = decoded.role;

      if (isAdminOnly && role === "rescuer") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      if (isRescuerOnly && role === "admin") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const response = NextResponse.next();
  if (isProtectedRoute) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
