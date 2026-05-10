"use client"

import { useRouter } from "next/navigation"
import { Users, Wallet, Award, Calendar, AudioWaveform, GraduationCap } from "lucide-react"
import { DashboardStats } from "@/components/features/dashboard-stats"
import { TransactionFeed } from "@/components/features/transaction-feed"
import { cn } from "@/lib/utils"

export default function DashboardOverview() {
  const router = useRouter()

  const quickActions = [
    { id: "mentors", icon: Users, label: "FIND A MENTOR", desc: "Browse the marketplace", color: "text-primary" },
    { id: "funding", icon: Wallet, label: "REQUEST FUNDING", desc: "Apply for micro-grants", color: "text-secondary" },
    { id: "sessions", icon: Calendar, label: "BOOK SESSION", desc: "Schedule mentorship", color: "text-accent" },
    { id: "reputation", icon: Award, label: "REPUTATION", desc: "View your score", color: "text-amber-400" },
    { id: "audio", icon: AudioWaveform, label: "AUDIO BRIEFS", desc: "Listen to summaries", color: "text-accent" },
  ]

  return (
    <div className="space-y-6">
      <DashboardStats />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <TransactionFeed />
        <div className="space-y-4">
          <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Actions
          </h3>
          <div className="grid gap-3">
            {quickActions.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(`/dashboard/${item.id === "reputation" || item.id === "sessions" || item.id === "mentors" ? item.id : item.id}`)}
                  className="terminal-card flex items-center gap-3 p-4 text-left transition-all duration-300 hover:border-primary/30 hover:glow-neon group"
                >
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-sm bg-background border border-border", item.color)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.label}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
