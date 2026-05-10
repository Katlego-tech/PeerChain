import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

let prismaClient: PrismaClient | null = null

export async function getPrisma(): Promise<PrismaClient> {
  if (prismaClient) return prismaClient
  if (globalForPrisma.prisma) return globalForPrisma.prisma

  const url = process.env.DATABASE_URL || ""

  if (url.includes("neon.tech")) {
    const { PrismaNeon } = await import("@prisma/adapter-neon")
    const { Pool } = await import("@neondatabase/serverless")
    const pool = new Pool({ connectionString: url })
    const adapter = new PrismaNeon(pool)
    prismaClient = new PrismaClient({ adapter })
  } else {
    const { PrismaPg } = await import("@prisma/adapter-pg")
    const { Pool } = await import("pg")
    const pool = new Pool({ connectionString: url })
    const adapter = new PrismaPg(pool)
    prismaClient = new PrismaClient({ adapter })
  }

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaClient
  }
  return prismaClient
}

