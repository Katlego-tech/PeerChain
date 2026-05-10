"use client"

import { motion } from "framer-motion"
import useSWR from "swr"
import { Award, BookOpen, Coins, Flame, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json()).then((json) => json.data || json)

interface StatsData {
  reputationScore: number
  sessionsCompleted: number
  fundingReceived: number
  learningStreak: number
}

const defaultStats: StatsData = {
  reputationScore: 0,
  sessionsCompleted: 0,
  fundingReceived: 0,
  learningStreak: 0,
}

const statCards = [
  {
    key: "reputationScore" as const,
    label: "REPUTATION SCORE",
    icon: Award,
    glow: "glow-neon",
    iconColor: "text-primary",
    format: (v: number) => v.toLocaleString(),
  },
  {
    key: "sessionsCompleted" as const,
    label: "SESSIONS COMPLETED",
    icon: BookOpen,
    glow: "glow-cyan",
    iconColor: "text-accent",
    format: (v: number) => v.toString(),
  },
  {
    key: "fundingReceived" as const,
    label: "FUNDING RECEIVED",
    icon: Coins,
    glow: "glow-magenta",
    iconColor: "text-secondary",
    format: (v: number) => `${v.toFixed(2)} SOL`,
  },
  {
    key: "learningStreak" as const,
    label: "LEARNING STREAK",
    icon: Flame,
    glow: "glow-cyan",
    iconColor: "text-accent",
    format: (v: number) => `${v} DAYS`,
  },
]

function StatSkeleton() {
  return (
    <Card className="p-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-3 w-24 rounded-sm bg-muted" />
          <div className="h-8 w-20 rounded-sm bg-muted" />
        </div>
        <div className="h-8 w-8 rounded-sm bg-muted" />
      </div>
    </Card>
  )
}

export function DashboardStats() {
  const { data, error, isLoading } = useSWR<StatsData>(
    "/api/reputation?user=test",
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false, dedupingInterval: 10000 }
  )

  const stats = data || defaultStats

  if (error) {
    return (
      <div className="rounded-sm border border-destructive/50 bg-destructive/5 p-4 text-center">
        <p className="text-sm font-mono text-destructive">FAILED TO LOAD STATISTICS</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
        : statCards.map((card, index) => {
            const Icon = card.icon
            const value = stats[card.key]
            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className={cn("p-4 hover:bg-card/80 transition-all duration-300", card.glow)}>
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-xs font-mono font-medium tracking-wider text-muted-foreground">
                          {card.label}
                        </p>
                        <p className="text-3xl font-bold font-mono text-foreground tracking-tight">
                          {card.format(value)}
                        </p>
                      </div>
                      <Icon className={cn("h-8 w-8 opacity-80", card.iconColor)} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
    </div>
  )
}
