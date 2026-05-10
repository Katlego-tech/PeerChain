import { NextRequest, NextResponse } from "next/server"
import { Connection, PublicKey } from "@solana/web3.js"

const SOLANA_RPC = process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const user = searchParams.get("user")

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User parameter required" },
        { status: 400 }
      )
    }

    const connection = new Connection(SOLANA_RPC, "confirmed")

    // In production, validate user as a real Pubkey and fetch from blockchain
    const mockReputation = {
      reputationScore: 74,
      overallScore: 74,
      totalSessions: 28,
      sessionsCompleted: 28,
      avgRating: 4.6,
      fundingReceived: 2.5,
      learningStreak: 5,
      peerEndorsements: 15,
      reliabilityScore: 82,
      expertiseScore: 68,
      contributionScore: 71,
      level: "APPRENTICE",
      rank: "TOP 35%",
    }

    return NextResponse.json({
      success: true,
      data: mockReputation,
    })
  } catch (error) {
    console.error("Reputation fetch error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch reputation" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user, sessionDuration, rating } = body

    if (!user || !sessionDuration) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    const connection = new Connection(SOLANA_RPC, "confirmed")

    // In production, this would create an update_reputation transaction
    // for the user to sign
    const mockUpdated = {
      user,
      score: 27, // Updated score
      sessionsCompleted: 4,
      newRating: rating || 5,
    }

    return NextResponse.json({
      success: true,
      data: mockUpdated,
      message: "Reputation updated successfully",
    })
  } catch (error) {
    console.error("Reputation update error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update reputation" },
      { status: 500 }
    )
  }
}
