"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ChevronDown, HelpCircle, Wallet, UserCheck, Coins, Shield, BookOpen, Cpu } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FAQItem {
  q: string
  a: string
  category: string
  icon: React.ElementType
}

const faqs: FAQItem[] = [
  { category: "GETTING STARTED", icon: Wallet, q: "What do I need to get started?", a: "You need a Solana wallet (Phantom or Solflare) and some devnet SOL for testing. Connect your wallet, create an account with your email, and you're ready to explore mentorship sessions, build reputation, and apply for funding." },
  { category: "GETTING STARTED", icon: BookOpen, q: "Is StudyStream free to use?", a: "Yes, the platform is free to join and browse. Mentorship sessions may have fees set by the mentor, paid in SOL. Funding requests are free to submit, and approved grants are distributed on-chain." },
  { category: "GETTING STARTED", icon: UserCheck, q: "How do I earn reputation?", a: "Reputation is earned by completing mentorship sessions and receiving peer ratings. Each session you complete adds to your score. Higher ratings from mentors and peers boost your reputation faster." },
  { category: "REPUTATION", icon: Shield, q: "What is my reputation score based on?", a: "Your score combines three factors: Reliability (session completion rate), Expertise (average ratings received), and Contribution (mentoring others, reviewing funding requests). All data is on-chain and verifiable." },
  { category: "REPUTATION", icon: Cpu, q: "Can my reputation be transferred?", a: "Your reputation is tied to your Solana wallet address. Since it's stored on-chain, it cannot be transferred or tampered with. This ensures genuine, verifiable trust credentials." },
  { category: "REPUTATION", icon: Coins, q: "How does reputation affect funding?", a: "Higher reputation scores unlock access to larger funding pools. Funding requests include your score, and reviewers prioritize applicants with proven track records. It's merit-based, transparent, and on-chain." },
  { category: "FUNDING", icon: Coins, q: "How do I request funding?", a: "Navigate to the Funding tab in your dashboard, click 'Request Funding', enter the amount and reason for your request. Your current reputation score is automatically included. Community reviewers vote on approvals." },
  { category: "FUNDING", icon: Shield, q: "Who approves funding requests?", a: "Funding requests are reviewed by the community. Users with high reputation scores can review and approve/reject requests. The system ensures diverse reviewers and prevents collusion." },
  { category: "TECHNICAL", icon: Cpu, q: "What blockchain does StudyStream use?", a: "StudyStream is built on Solana for its low fees, fast transactions, and scalability. We use devnet for testing. Smart contracts are written with the Anchor framework." },
  { category: "TECHNICAL", icon: Wallet, q: "Which wallets are supported?", a: "We support Phantom and Solflare wallets for Solana, plus MetaMask for EVM chains. Your data and reputation are tied to your wallet address." },
  { category: "TECHNICAL", icon: Shield, q: "Is my data safe?", a: "Passwords are hashed with bcrypt. Sessions use JWT tokens in secure cookies. On-chain data is public by design — that's how reputation is verifiable. We never store private keys." },
]

const categories = Array.from(new Set(faqs.map((f) => f.category)))

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("ALL")

  const toggle = (id: number) => setOpenId(openId === id ? null : id)

  const filtered = activeCategory === "ALL" ? faqs : faqs.filter((f) => f.category === activeCategory)

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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">FREQUENTLY ASKED <span className="text-gradient-neon">QUESTIONS</span></h1>
          <p className="mt-2 text-sm font-mono text-muted-foreground">EVERYTHING YOU NEED TO KNOW ABOUT STUDYSTREAM</p>
        </motion.div>

        {/* Category filter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-8 flex flex-wrap gap-2">
          {["ALL", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-sm border px-3 py-1.5 text-[11px] font-mono font-medium uppercase tracking-wider transition-all duration-300",
                activeCategory === cat
                  ? "border-primary text-primary bg-primary/10 glow-neon"
                  : "border-border text-muted-foreground bg-transparent hover:border-primary/50 hover:text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* FAQ accordion */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8 space-y-2">
          {filtered.map((faq, i) => {
            const isOpen = openId === i
            const globalIndex = faqs.indexOf(faq)
            const Icon = faq.icon
            return (
              <motion.div
                key={globalIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card className={cn(
                  "overflow-hidden transition-all duration-300",
                  isOpen ? "border-primary/40" : "hover:border-primary/20"
                )}>
                  <button
                    onClick={() => toggle(globalIndex)}
                    className="flex w-full items-center gap-3 p-4 text-left"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary" />
                    <span className="flex-1 text-xs font-mono font-semibold text-foreground leading-relaxed">
                      {faq.q}
                    </span>
                    <ChevronDown className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                      isOpen && "rotate-180"
                    )} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border px-4 py-3">
                          <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <HelpCircle className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm font-mono text-muted-foreground">NO FAQS IN THIS CATEGORY</p>
          </div>
        )}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-12 text-center">
          <Card className="p-6 inline-block">
            <p className="text-xs font-mono text-muted-foreground">
              STILL HAVE QUESTIONS?{" "}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                OPEN A GITHUB ISSUE
              </a>
            </p>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
