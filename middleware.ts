import { NextResponse } from "next/server"
import { verifySession } from "@/lib/auth"

const protectedPaths = ["/dashboard"]
const authPaths = ["/auth/signin", "/auth/register"]

export default async function middleware(request: Request) {
  const { pathname } = new URL(request.url)

  const isProtected = protectedPaths.some((p) => pathname.startsWith(p))
  const isAuthPage = authPaths.some((p) => pathname.startsWith(p))

  const token = request.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("session="))
    ?.split("=")[1]

  const session = token ? await verifySession(token) : null

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url))
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}
