"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Shield, Eye, Database, Mail } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"

const sections = [
  {
    icon: Database,
    title: "INFORMATION WE COLLECT",
    content: "StudyStream collects minimal information required to operate the platform. We store your email address and a secure password hash when you register. On-chain, your Solana wallet address, session data you record, and reputation scores from peer ratings are publicly visible on the Solana blockchain.",
  },
  {
    icon: Eye,
    title: "HOW WE USE INFORMATION",
    content: "All core platform data is stored on the Solana blockchain and is publicly verifiable. Your email is used solely for authentication and account recovery. We do not sell, rent, or share personal information with third parties. Audio generated via our TTS feature is processed temporarily and not stored after delivery.",
  },
  {
    icon: Shield,
    title: "DATA SECURITY",
    content: "Passwords are hashed using bcrypt before storage. Authentication uses JSON Web Tokens (JWT) stored in secure HttpOnly cookies. No private keys ever leave your wallet — blockchain transactions are signed locally. We follow security best practices for all data handling.",
  },
  {
    icon: Mail,
    title: "CONTACT",
    content: "For questions about this policy or your data, reach out via our GitHub repository. We review and update this policy as needed to reflect changes in our practices.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-3 w-3" /> BACK TO HOME
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">PRIVACY <span className="text-gradient-neon">POLICY</span></h1>
          <p className="mt-2 text-xs font-mono text-muted-foreground">LAST UPDATED: MAY 2026</p>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-6 text-sm font-mono text-muted-foreground leading-relaxed">
          Your privacy matters. StudyStream is designed to minimize data collection while providing a transparent,
          on-chain reputation system. Here&apos;s what you need to know.
        </motion.p>

        <div className="mt-12 space-y-4">
          {sections.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-5 hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-primary/30 bg-primary/5">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold font-mono text-foreground mb-2">{s.title}</h2>
                      <p className="text-xs font-mono text-muted-foreground leading-relaxed">{s.content}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
