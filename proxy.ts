import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const { pathname, search } = request.nextUrl;

    const originalDestination = `${pathname}${search}`;

    const loginUrl = new URL("/api/auth/oauth2/callback/keycloak", request.url);
    loginUrl.searchParams.set("callbackURL", originalDestination);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
