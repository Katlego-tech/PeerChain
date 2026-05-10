"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Wallet, Users, Award, Coins, ArrowRight, CheckCircle, Cpu, Zap, ChevronRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const steps = [
  {
    num: "01",
    icon: Wallet,
    title: "CONNECT WALLET",
    subtitle: "ESTABLISH YOUR IDENTITY",
    desc: "Link your Solana wallet to create your on-chain identity. Your wallet is your passport — all reputation, funding, and session history are tied to it.",
    details: [
      "Install Phantom or Solflare wallet",
      "Get devnet SOL from a faucet",
      "Connect via the top-right button",
      "Sign the verification message",
    ],
    color: "text-primary",
    border: "border-primary/40",
    glow: "glow-neon",
  },
  {
    num: "02",
    icon: Users,
    title: "FIND A MENTOR",
    subtitle: "BROWSE THE MARKETPLACE",
    desc: "Browse mentors by specialization, rating, and price. Each mentor has a verifiable reputation history from past sessions.",
    details: [
      "Search by skill or topic",
      "Filter by availability and price",
      "Read peer reviews and ratings",
      "Book a session directly",
    ],
    color: "text-accent",
    border: "border-accent/40",
    glow: "glow-cyan",
  },
  {
    num: "03",
    icon: Award,
    title: "LEARN & EARN",
    subtitle: "BUILD YOUR REPUTATION",
    desc: "Complete mentorship sessions and receive peer ratings. Each session builds your on-chain reputation score.",
    details: [
      "Join one-on-one or group sessions",
      "Receive ratings from peers",
      "Your score updates automatically",
      "Higher reputation unlocks more opportunities",
    ],
    color: "text-amber-400",
    border: "border-amber-400/40",
    glow: "glow-neon",
  },
  {
    num: "04",
    icon: Coins,
    title: "ACCESS FUNDING",
    subtitle: "MERIT-BASED MICRO-GRANTS",
    desc: "Apply for funding backed by your reputation. Community reviewers evaluate requests. Approved grants are distributed on-chain.",
    details: [
      "Submit a funding request with amount and reason",
      "Your reputation score is included automatically",
      "Community reviews and votes",
      "Approved funds sent directly to your wallet",
    ],
    color: "text-secondary",
    border: "border-secondary/40",
    glow: "glow-magenta",
  },
]

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [complete, setComplete] = useState(false)

  const toggleCheck = (id: string) => {
    const next = new Set(checked)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setChecked(next)
  }

  const current = steps[activeStep]
  const allChecked = current.details.every((_, i) => checked.has(`${activeStep}-${i}`))

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      setComplete(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-3 w-3" /> BACK TO HOME
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">HOW IT <span className="text-gradient-neon">WORKS</span></h1>
          <p className="mt-2 text-sm font-mono text-muted-foreground">A STEP-BY-STEP GUIDE TO THE STUDYSTREAM PROTOCOL</p>
        </motion.div>

        {/* Step progress bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-10">
          <div className="flex items-center gap-2">
            {steps.map((step, i) => (
              <div key={step.num} className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => setActiveStep(i)}
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-300",
                    i === activeStep ? "bg-primary/10 text-primary border border-primary/30" :
                    i < activeStep ? "text-primary/60" : "text-muted-foreground border border-border"
                  )}
                >
                  <span className={cn("flex h-5 w-5 items-center justify-center rounded-sm text-[10px]",
                    i <= activeStep ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}>
                    {i < activeStep ? <CheckCircle className="h-3 w-3" /> : step.num}
                  </span>
                  <span className="hidden sm:inline">{step.title}</span>
                </button>
                {i < steps.length - 1 && <div className="h-px flex-1 bg-border" />}
              </div>
            ))}
          </div>
        </motion.div>

        {complete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 text-center"
          >
            <Card className="p-10 glow-neon">
              <div className="flex justify-center mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-sm border-2 border-primary bg-primary/5">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold font-mono text-foreground mb-3">YOU&apos;RE READY!</h2>
              <p className="text-sm font-mono text-muted-foreground max-w-md mx-auto mb-8">
                You now understand the StudyStream protocol. Connect your wallet and start your learning journey.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/dashboard">
                  <Button className="font-mono text-xs gap-2">
                    LAUNCH APP <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" className="font-mono text-xs" onClick={() => { setActiveStep(0); setChecked(new Set()); setComplete(false) }}>
                  START OVER
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-10"
            >
              <Card className={cn("p-6 sm:p-8 border-2 transition-all duration-300", current.border, current.glow)}>
                <div className="flex items-start gap-5">
                  <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border-2", current.border)}>
                    <current.icon className={cn("h-7 w-7", current.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-[10px]">{current.num}</Badge>
                      <span className="text-[10px] font-mono text-muted-foreground tracking-wider">{current.subtitle}</span>
                    </div>
                    <h2 className={cn("text-xl font-bold font-mono", current.color)}>{current.title}</h2>
                    <p className="mt-3 text-sm font-mono text-muted-foreground leading-relaxed">{current.desc}</p>

                    {/* Interactive checklist */}
                    <div className="mt-6 space-y-2">
                      {current.details.map((detail, i) => {
                        const id = `${activeStep}-${i}`
                        const isChecked = checked.has(id)
                        return (
                          <button
                            key={id}
                            onClick={() => toggleCheck(id)}
                            className="flex w-full items-center gap-3 rounded-sm border border-border p-3 text-left transition-all duration-300 hover:border-primary/30 group"
                          >
                            <div className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-all duration-300",
                              isChecked
                                ? "bg-primary border-primary"
                                : "border-border group-hover:border-primary/50"
                            )}>
                              {isChecked && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
                            </div>
                            <span className={cn(
                              "text-xs font-mono transition-all duration-300",
                              isChecked ? "text-primary line-through" : "text-foreground"
                            )}>
                              {detail}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {checked.size}/{current.details.length + (activeStep > 0 ? steps.slice(0, activeStep).reduce((a, s) => a + s.details.length, 0) : 0)} COMPLETED
                      </span>
                      <Button
                        onClick={handleNext}
                        className="font-mono text-xs gap-2"
                        disabled={!allChecked}
                      >
                        {activeStep < steps.length - 1 ? (
                          <>NEXT STEP <ArrowRight className="h-4 w-4" /></>
                        ) : (
                          <>FINISH <CheckCircle className="h-4 w-4" /></>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}
      </main>
      <Footer />
    </div>
  )
}
