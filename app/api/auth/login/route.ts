import { NextRequest, NextResponse } from "next/server"
import { getPrisma } from "@/lib/prisma"
import { verifyPassword, createSession, getSessionCookieHeader } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    const prisma = await getPrisma()
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const valid = await verifyPassword(password, user.password)
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const token = await createSession(user.id, user.email)

    const response = NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
    })
    response.headers.set("Set-Cookie", getSessionCookieHeader(token))
    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
