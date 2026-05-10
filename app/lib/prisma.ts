import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

let prismaClient: PrismaClient | null = null

export async function getPrisma(): Promise<PrismaClient> {
  if (prismaClient) return prismaClient
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  try {
    const { PrismaNeon } = await import("@prisma/adapter-neon")
    const { Pool } = await import("@neondatabase/serverless")
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    const adapter = new PrismaNeon(pool)
    prismaClient = new PrismaClient({ adapter })
  } catch {
    prismaClient = new PrismaClient()
  }

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaClient
  }
  return prismaClient
}

