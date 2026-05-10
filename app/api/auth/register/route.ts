import { NextRequest, NextResponse } from "next/server"
import { getPrisma } from "@/lib/prisma"
import { hashPassword, createSession, getSessionCookieHeader } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const prisma = await getPrisma()
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    const hashed = await hashPassword(password)
    const user = await prisma.user.create({
      data: { email, password: hashed, name: name || null },
    })

    const token = await createSession(user.id, user.email)

    const response = NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
    })
    response.headers.set("Set-Cookie", getSessionCookieHeader(token))
    return response
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
