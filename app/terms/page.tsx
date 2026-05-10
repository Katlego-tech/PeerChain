"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, FileText, AlertTriangle, Ban, Scale } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"

const sections = [
  {
    icon: FileText,
    title: "ACCEPTANCE OF TERMS",
    content: "By using StudyStream, you agree to these terms of service. StudyStream is a decentralized learning protocol provided as-is without warranty. If you do not agree, do not use the platform.",
  },
  {
    icon: AlertTriangle,
    title: "USE OF SERVICE",
    content: "You agree to use StudyStream for lawful purposes only. You are solely responsible for your Solana wallet, any transactions you sign, and the content of your mentorship sessions. Abusive, fraudulent, or illegal activity will result in account suspension.",
  },
  {
    icon: Ban,
    title: "BLOCKCHAIN TRANSACTIONS",
    content: "All transactions on the Solana blockchain are final and irreversible. StudyStream is not responsible for lost funds, failed transactions, or errors in smart contract interactions. Always verify transaction details before signing. Use devnet for testing.",
  },
  {
    icon: Scale,
    title: "LIMITATION OF LIABILITY",
    content: "StudyStream is provided for educational and demonstration purposes. The protocol developers and contributors are not liable for any damages, losses, or issues arising from use of this platform. Participation is at your own risk.",
  },
]

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">TERMS OF <span className="text-gradient-magenta">SERVICE</span></h1>
          <p className="mt-2 text-xs font-mono text-muted-foreground">LAST UPDATED: MAY 2026</p>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-6 text-sm font-mono text-muted-foreground leading-relaxed">
          By accessing or using StudyStream, you agree to be bound by these terms. Please read them carefully.
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
                <Card className="p-5 hover:border-secondary/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-secondary/30 bg-secondary/5">
                      <Icon className="h-5 w-5 text-secondary" />
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
