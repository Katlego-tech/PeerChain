"use client"

import { useState } from "react"
import useSWR from "swr"
import { motion, AnimatePresence } from "framer-motion"
import {
  Award,
  TrendingUp,
  Shield,
  Star,
  Clock,
  CheckCircle,
  Loader2,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Zap,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const fetcher = (url: string) =>
  fetch(url).then((r) => r.json()).then((json) => json.data || json)

interface ReputationData {
  overallScore: number
  totalSessions: number
  avgRating: number
  peerEndorsements: number
  reliabilityScore: number
  expertiseScore: number
  contributionScore: number
  level: string
  rank: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
}

interface HistoryEntry {
  id: string
  type: "earned" | "lost" | "milestone"
  amount: number
  reason: string
  timestamp: string
}

const defaultRep: ReputationData = {
  overallScore: 74,
  totalSessions: 28,
  avgRating: 4.6,
  peerEndorsements: 15,
  reliabilityScore: 82,
  expertiseScore: 68,
  contributionScore: 71,
  level: "APPRENTICE",
  rank: "TOP 35%",
}

const achievements: Achievement[] = [
  { id: "a1", title: "FIRST SESSION", description: "Complete your first mentorship session", icon: "★", unlocked: true, unlockedAt: "2 MONTHS AGO" },
  { id: "a2", title: "STREAK STARTER", description: "Maintain a 7-day learning streak", icon: "🔥", unlocked: true, unlockedAt: "1 MONTH AGO" },
  { id: "a3", title: "FIVE STARS", description: "Receive 5 five-star ratings", icon: "⭐", unlocked: true, unlockedAt: "3 WEEKS AGO" },
  { id: "a4", title: "MENTOR MILESTONE", description: "Complete 10 mentoring sessions", icon: "🎯", unlocked: false },
  { id: "a5", title: "REPUTATION MASTER", description: "Achieve a reputation score of 90+", icon: "🏆", unlocked: false },
  { id: "a6", title: "COMMUNITY PILLAR", description: "Earn 50 peer endorsements", icon: "👑", unlocked: false },
]

const historyEntries: HistoryEntry[] = [
  { id: "h1", type: "earned", amount: 5, reason: "Positive session rating from Alex Rivera", timestamp: "2H AGO" },
  { id: "h2", type: "milestone", amount: 10, reason: "Completed 25th session milestone bonus", timestamp: "1D AGO" },
  { id: "h3", type: "earned", amount: 3, reason: "Peer endorsement for Rust expertise", timestamp: "3D AGO" },
  { id: "h4", type: "earned", amount: 2, reason: "Code review accepted with improvements", timestamp: "5D AGO" },
  { id: "h5", type: "lost", amount: -1, reason: "Missed scheduled session (no-show)", timestamp: "1W AGO" },
]

export function ReputationProfile() {
  const { data, error, isLoading } = useSWR<ReputationData>(
    "/api/reputation?user=test",
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false, dedupingInterval: 10000 }
  )

  const [activeTab, setActiveTab] = useState<"breakdown" | "history" | "achievements">("breakdown")

  const rep = data || defaultRep
  const tabClass = (tab: string) => cn(
    "px-4 py-2 text-xs font-mono font-medium uppercase tracking-wider rounded-sm transition-all duration-300",
    activeTab === tab
      ? "bg-primary/10 text-primary border border-primary/30 glow-neon"
      : "text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
  )

  const scoreBars = [
    { label: "RELIABILITY", value: rep.reliabilityScore, color: "bg-primary" },
    { label: "EXPERTISE", value: rep.expertiseScore, color: "bg-secondary" },
    { label: "CONTRIBUTION", value: rep.contributionScore, color: "bg-accent" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      {error ? (
        <div className="rounded-sm border border-destructive/50 bg-destructive/5 p-4 text-center">
          <p className="text-sm font-mono text-destructive">FAILED TO LOAD REPUTATION DATA</p>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-6">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-sm border-2 border-primary glow-neon bg-card">
                      <div className="text-center">
                        <div className="text-3xl font-bold font-mono text-primary">{rep.overallScore}</div>
                        <div className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest">Score</div>
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <Badge variant="default" className="text-[9px] px-1.5 py-0.5">{rep.rank}</Badge>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h2 className="text-xl font-bold font-mono tracking-tight text-foreground">
                        REPUTATION PROFILE
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px]">{rep.level}</Badge>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {rep.totalSessions} SESSIONS &middot; {rep.avgRating.toFixed(1)} AVG RATING
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                      Your reputation is built on verifiable on-chain activity. Higher scores unlock greater
                      funding access, mentorship opportunities, and community influence.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 border-b border-border pb-3">
            <button onClick={() => setActiveTab("breakdown")} className={tabClass("breakdown")}>
              SCORE BREAKDOWN
            </button>
            <button onClick={() => setActiveTab("history")} className={tabClass("history")}>
              HISTORY
            </button>
            <button onClick={() => setActiveTab("achievements")} className={tabClass("achievements")}>
              ACHIEVEMENTS
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Breakdown */}
              {activeTab === "breakdown" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {scoreBars.map((bar, i) => (
                      <motion.div
                        key={bar.label}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Card className="p-4 text-center">
                          <CardContent className="p-0 space-y-3">
                            <p className="text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                              {bar.label}
                            </p>
                            <div className="text-3xl font-bold font-mono text-foreground">
                              {bar.value}
                            </div>
                            <Progress value={bar.value} className="h-1.5" indicatorClass={bar.color} />
                            <p className="text-[10px] font-mono text-muted-foreground">
                              {bar.value >= 80 ? "EXCELLENT" : bar.value >= 60 ? "GOOD" : "NEEDS IMPROVEMENT"}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <Card className="p-4">
                    <CardContent className="p-0">
                      <h3 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider mb-4">
                        KEY METRICS
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                          { icon: Star, label: "ENDORSEMENTS", value: rep.peerEndorsements.toString(), color: "text-amber-400" },
                          { icon: Award, label: "SESSIONS", value: rep.totalSessions.toString(), color: "text-primary" },
                          { icon: Shield, label: "RELIABILITY", value: `${rep.reliabilityScore}%`, color: "text-accent" },
                          { icon: TrendingUp, label: "AVG RATING", value: rep.avgRating.toFixed(1), color: "text-secondary" },
                        ].map((m) => {
                          const Icon = m.icon
                          return (
                            <div key={m.label} className="text-center">
                              <Icon className={cn("h-5 w-5 mx-auto mb-1", m.color)} />
                              <p className="text-lg font-bold font-mono text-foreground">{m.value}</p>
                              <p className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">{m.label}</p>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* History */}
              {activeTab === "history" && (
                <div className="space-y-1">
                  {historyEntries.length === 0 ? (
                    <div className="py-12 text-center">
                      <Clock className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-sm font-mono text-muted-foreground">NO REPUTATION HISTORY YET</p>
                    </div>
                  ) : (
                    historyEntries.map((entry, i) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between rounded-sm border border-border bg-card/50 px-4 py-3 hover:border-primary/20 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border",
                            entry.type === "earned" ? "border-primary/30 text-primary" :
                            entry.type === "lost" ? "border-destructive/30 text-destructive" :
                            "border-accent/30 text-accent"
                          )}>
                            {entry.type === "earned" ? <TrendingUp className="h-4 w-4" /> :
                             entry.type === "lost" ? <AlertTriangle className="h-4 w-4" /> :
                             <Award className="h-4 w-4" />}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{entry.reason}</p>
                            <p className="text-[10px] font-mono text-muted-foreground">{entry.timestamp}</p>
                          </div>
                        </div>
                        <span className={cn(
                          "text-xs font-mono font-bold shrink-0 ml-3",
                          entry.amount > 0 ? "text-primary" : "text-destructive"
                        )}>
                          {entry.amount > 0 ? "+" : ""}{entry.amount}
                        </span>
                      </motion.div>
                    ))
                  )}
                </div>
              )}

              {/* Achievements */}
              {activeTab === "achievements" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {achievements.map((ach, i) => (
                    <motion.div
                      key={ach.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Card className={cn(
                        "p-4 transition-all duration-300",
                        ach.unlocked ? "hover:glow-neon" : "opacity-50"
                      )}>
                        <CardContent className="p-0 space-y-2">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "flex h-9 w-9 items-center justify-center rounded-sm text-lg",
                              ach.unlocked ? "bg-primary/10 border border-primary/30" : "bg-muted border border-border"
                            )}>
                              {ach.icon}
                            </div>
                            <div className="min-w-0">
                              <p className={cn(
                                "text-xs font-bold font-mono tracking-tight",
                                ach.unlocked ? "text-foreground" : "text-muted-foreground"
                              )}>
                                {ach.title}
                              </p>
                              <p className="text-[10px] font-mono text-muted-foreground">
                                {ach.unlocked ? ach.unlockedAt : "LOCKED"}
                              </p>
                            </div>
                          </div>
                          <p className="text-[10px] font-mono text-muted-foreground leading-relaxed">
                            {ach.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  )
}


