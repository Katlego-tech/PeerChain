"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import {
  Users,
  BookOpen,
  Wallet,
  Cpu,
  Award,
  Zap,
  ArrowRight,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ConnectWallet } from "@/components/layout/connect-wallet"

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const steps = [
  {
    num: "01",
    title: "CONNECT WALLET",
    desc: "Link your Solana wallet to establish your on-chain identity and begin your learning journey.",
  },
  {
    num: "02",
    title: "BUILD REPUTATION",
    desc: "Complete mentorship sessions, earn peer ratings, and accumulate verifiable trust credentials.",
  },
  {
    num: "03",
    title: "ACCESS FUNDING",
    desc: "Unlock micro-grants and learning rewards based on your reputation score and contribution history.",
  },
  {
    num: "04",
    title: "LEVEL UP",
    desc: "Reinvest knowledge and capital back into the ecosystem. Mentor others and earn while you learn.",
  },
]

const metrics = [
  { value: "2,847", label: "ACTIVE LEARNERS" },
  { value: "12,430", label: "SESSIONS COMPLETED" },
  { value: "847", label: "SOL DISTRIBUTED" },
  { value: "4.92", label: "AVG RATING" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="bg-grid absolute inset-0 opacity-50" />

        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[100px]" />
        <div className="absolute right-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[80px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <motion.div
              className="lg:col-span-7"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp} className="mb-6">
                <Badge
                  variant="outline"
                  className="border-primary/30 font-mono text-xs tracking-[0.2em] text-primary"
                >
                  <Zap className="mr-1.5 h-3 w-3" />
                  DECENTRALIZED PROTOCOL V0.1
                </Badge>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl"
              >
                <span className="text-gradient-neon">PROOF OF</span>
                <br />
                <span className="text-gradient-neon">LEARNING</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 font-mono text-sm tracking-wider text-muted-foreground sm:text-base"
              >
                POWERED BY SOLANA &bull; DECENTRALIZED EDUCATION PROTOCOL
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                StudyStream is a decentralized learning protocol where your
                knowledge becomes your reputation, and your reputation unlocks
                funding. No intermediaries. No gatekeepers. Just pure
                peer-to-peer education powered by Solana.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
              >
                <Link href="/dashboard">
                  <Button size="lg" className="gap-2 font-mono text-sm">
                    LAUNCH APP
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <ConnectWallet />
              </motion.div>
            </motion.div>

            <motion.div
              className="hidden lg:col-span-5 lg:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="space-y-5 p-6">
                {[
                  {
                    value: "2,847",
                    label: "LEARNERS",
                    icon: <Users className="h-4 w-4 text-primary" />,
                  },
                  {
                    value: "12,430",
                    label: "SESSIONS",
                    icon: <BookOpen className="h-4 w-4 text-secondary" />,
                  },
                  {
                    value: "847",
                    label: "SOL FUNDED",
                    icon: <Wallet className="h-4 w-4 text-accent" />,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-muted">
                        {stat.icon}
                      </div>
                      <span className="font-mono text-xs tracking-wider text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <span className="font-mono text-lg font-bold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                ))}
                <div className="border-t border-border pt-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-primary">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    LIVE &mdash; DATA REFRESHES EVERY BLOCK
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex flex-col items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground">
            <span>SCROLL</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="h-4 w-4 rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative border-t border-border py-24 lg:py-32">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <Badge
              variant="outline"
              className="mb-4 border-muted-foreground/20 font-mono text-xs tracking-[0.2em]"
            >
              PROTOCOL OVERVIEW
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              OPERATING <span className="text-gradient-neon">PROTOCOL</span>
            </h2>
          </motion.div>

          <div className="relative grid gap-6 lg:grid-cols-4">
            <div className="absolute left-[12.5%] right-[12.5%] top-12 hidden h-px bg-gradient-to-r from-primary via-secondary to-accent lg:block" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card className="group p-6 text-center transition-colors duration-300 hover:border-primary/40">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-muted transition-all duration-300 group-hover:glow-neon">
                    <span className="font-mono text-xl font-bold text-primary">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="mb-3 font-mono text-sm font-bold tracking-wider text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REPUTATION ECONOMY ── */}
      <section className="relative border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <Badge
              variant="outline"
              className="mb-4 border-muted-foreground/20 font-mono text-xs tracking-[0.2em]"
            >
              TRUST MECHANISM
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              REPUTATION <span className="text-gradient-magenta">ECONOMY</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-mono text-sm tracking-wide text-muted-foreground">
              Your actions on StudyStream build a verifiable on-chain reputation
              that directly determines your access to funding and opportunities.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <Card className="group p-8 transition-all duration-300 hover:glow-neon">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-sm bg-muted text-primary transition-all duration-300 group-hover:bg-primary/10">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="mb-3 font-mono text-sm font-bold tracking-wider text-foreground transition-colors group-hover:text-primary">
                  ON-CHAIN SCORING
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Your reputation is stored immutably on Solana. Transparent,
                  verifiable, and completely under your control.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Card className="group p-8 transition-all duration-300 hover:glow-magenta">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-sm bg-muted text-secondary transition-all duration-300 group-hover:bg-secondary/10">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mb-3 font-mono text-sm font-bold tracking-wider text-foreground transition-colors group-hover:text-secondary">
                  PEER VERIFIED
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Every rating comes from real mentorship sessions. No bots, no
                  gaming &mdash; just genuine peer validation.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="group p-8 transition-all duration-300 hover:glow-cyan">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-sm bg-muted text-accent transition-all duration-300 group-hover:bg-accent/10">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="mb-3 font-mono text-sm font-bold tracking-wider text-foreground transition-colors group-hover:text-accent">
                  MERIT BASED FUNDING
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Higher reputation unlocks greater funding pools. Your on-chain
                  history determines your access to capital.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMMUNITY METRICS ── */}
      <section className="relative border-t border-border py-24 lg:py-32">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <Badge
              variant="outline"
              className="mb-4 border-muted-foreground/20 font-mono text-xs tracking-[0.2em]"
            >
              NETWORK STATE
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              COMMUNITY <span className="text-gradient-neon">METRICS</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="p-6 text-center transition-colors duration-300 hover:border-primary/40">
                  <div className="font-mono text-3xl font-bold tracking-tighter text-gradient-neon sm:text-4xl lg:text-5xl">
                    {metric.value}
                  </div>
                  <div className="mt-1 font-mono text-xs tracking-wider text-muted-foreground">
                    {metric.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10" />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              READY TO PROVE YOUR{' '}
              <span className="text-gradient-neon">KNOWLEDGE</span>?
            </h2>
            <p className="mt-4 font-mono text-sm tracking-wider text-muted-foreground">
              Join the decentralized learning revolution on Solana
            </p>
            <div className="mt-10">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 font-mono text-sm">
                  GET STARTED
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
