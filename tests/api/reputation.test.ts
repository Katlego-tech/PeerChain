jest.mock("next/server", () => {
  const original = jest.requireActual("../__mocks__/next-server")
  return original
})

jest.mock("@solana/web3.js", () => {
  const original = jest.requireActual("../__mocks__/@solana/web3.js")
  return original
})

import { GET, POST } from "@/api/reputation/route"
import { NextRequest } from "next/server"

describe("Reputation API", () => {
  describe("GET", () => {
    it("returns 400 when user param is missing", async () => {
      const req = new NextRequest("http://localhost:3000/api/reputation")
      const res = await GET(req)
      expect(res.status).toBe(400)
      const body = await res.json()
      expect(body.success).toBe(false)
      expect(body.error).toContain("User parameter required")
    })

    it("returns 200 with reputation data when user provided", async () => {
      const req = new NextRequest("http://localhost:3000/api/reputation?user=testuser")
      const res = await GET(req)
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body.success).toBe(true)
      expect(body.data).toBeDefined()
      expect(body.data.reputationScore).toBe(74)
      expect(body.data.overallScore).toBe(74)
      expect(body.data.totalSessions).toBe(28)
      expect(typeof body.data.avgRating).toBe("number")
    })
  })

  describe("POST", () => {
    it("returns 400 when required fields are missing", async () => {
      const req = new NextRequest("http://localhost:3000/api/reputation", {
        method: "POST",
        body: JSON.stringify({}),
      })
      const res = await POST(req)
      expect(res.status).toBe(400)
      const body = await res.json()
      expect(body.success).toBe(false)
      expect(body.error).toContain("Missing required fields")
    })

    it("returns 400 when sessionDuration is missing", async () => {
      const req = new NextRequest("http://localhost:3000/api/reputation", {
        method: "POST",
        body: JSON.stringify({ user: "testuser" }),
      })
      const res = await POST(req)
      expect(res.status).toBe(400)
    })

    it("returns 200 with updated reputation when valid", async () => {
      const req = new NextRequest("http://localhost:3000/api/reputation", {
        method: "POST",
        body: JSON.stringify({
          user: "testuser",
          sessionDuration: 60,
          rating: 5,
        }),
      })
      const res = await POST(req)
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body.success).toBe(true)
      expect(body.data.user).toBe("testuser")
      expect(body.data.score).toBe(27)
    })
  })
})
