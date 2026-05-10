import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import { hash } from "bcryptjs"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const password = await hash("demo1234", 10)

  const user = await prisma.user.upsert({
    where: { email: "demo@studystream.io" },
    update: {},
    create: {
      email: "demo@studystream.io",
      password,
      name: "Demo Learner",
    },
  })

  console.log("Demo user created:", user.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
