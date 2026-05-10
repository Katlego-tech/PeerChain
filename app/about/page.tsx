"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Cpu, Users, Wallet, Award, Globe } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

const values = [
  { icon: Cpu, label: "DECENTRALIZED", desc: "No gatekeepers. Your reputation is your own, stored immutably on Solana." },
  { icon: Users, label: "PEER-POWERED", desc: "Every rating comes from real mentorship. Community-verified trust." },
  { icon: Wallet, label: "MERIT-BASED", desc: "Funding flows to proven contributors. Your history determines access." },
  { icon: Award, label: "TRANSPARENT", desc: "All scores, transactions, and decisions are on-chain and verifiable." },
  { icon: Globe, label: "GLOBAL ACCESS", desc: "Anyone with a Solana wallet can participate. No borders, no barriers." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-3 w-3" /> BACK TO HOME
          </Link>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold tracking-tight sm:text-5xl">
          ABOUT <span className="text-gradient-neon">STUDYSTREAM</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-4 font-mono text-sm text-muted-foreground leading-relaxed max-w-2xl">
          StudyStream is a decentralized learning protocol on Solana where your knowledge becomes your reputation,
          and your reputation unlocks funding. No intermediaries, no gatekeepers — just pure peer-to-peer education.
        </motion.p>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">OUR <span className="text-gradient-neon">MISSION</span></h2>
          <Card className="p-6">
            <p className="text-sm font-mono text-muted-foreground leading-relaxed">
              We believe education should be accessible to everyone. StudyStream creates a trust-based ecosystem
              where learners prove their commitment through participation, build reputation through peer reviews,
              and access funding based on merit rather than traditional barriers. Our protocol rewards those who
              teach, learn, and contribute — creating a self-sustaining cycle of knowledge and capital.
            </p>
          </Card>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">CORE <span className="text-gradient-magenta">VALUES</span></h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div key={v.label} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
                  <Card className="p-5 h-full hover:glow-neon transition-all duration-300">
                    <Icon className="h-6 w-6 text-primary mb-3" />
                    <h3 className="text-sm font-bold font-mono text-foreground mb-2">{v.label}</h3>
                    <p className="text-xs font-mono text-muted-foreground leading-relaxed">{v.desc}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8">TECHNOLOGY <span className="text-gradient-cyan">STACK</span></h2>
          <Card className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { label: "SOLANA", desc: "BLOCKCHAIN" },
                { label: "ANCHOR", desc: "FRAMEWORK" },
                { label: "NEXT.JS 16", desc: "FRONTEND" },
                { label: "VERCEL", desc: "HOSTING" },
              ].map((t) => (
                <div key={t.label}>
                  <p className="text-sm font-bold font-mono text-primary">{t.label}</p>
                  <p className="text-[10px] font-mono text-muted-foreground tracking-wider">{t.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  )
}
