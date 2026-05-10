"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Coins,
  CalendarCheck,
  Activity,
  Shield,
  UserCheck,
  UserX,
  CheckCircle,
  XCircle,
  Loader2,
  Search,
  MoreHorizontal,
  Ban,
  Trash2,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AdminStats {
  totalUsers: number
  activeSessions: number
  pendingFunding: number
  totalFees: number
}

interface UserRow {
  id: string
  wallet: string
  name: string
  reputation: number
  sessionsCompleted: number
  status: "active" | "suspended" | "flagged"
  joined: string
}

interface FundingItem {
  id: string
  requester: string
  amount: number
  reason: string
  score: number
  status: "Pending" | "Approved" | "Rejected"
}

const defaultStats: AdminStats = {
  totalUsers: 847,
  activeSessions: 23,
  pendingFunding: 12,
  totalFees: 47.5,
}

const users: UserRow[] = [
  { id: "u1", wallet: "AbC1...xYz9", name: "ALEX RIVERA", reputation: 92, sessionsCompleted: 342, status: "active", joined: "2025-08" },
  { id: "u2", wallet: "DeF2...WvU8", name: "MIA CHEN", reputation: 88, sessionsCompleted: 215, status: "active", joined: "2025-09" },
  { id: "u3", wallet: "GhI3...tSr7", name: "ZARA OKONKWO", reputation: 76, sessionsCompleted: 489, status: "active", joined: "2025-06" },
  { id: "u4", wallet: "JkL4...qPp6", name: "KENJI TANAKA", reputation: 94, sessionsCompleted: 401, status: "active", joined: "2025-07" },
  { id: "u5", wallet: "MnO5...nLm5", name: "MARK JENKINS", reputation: 23, sessionsCompleted: 4, status: "flagged", joined: "2026-03" },
  { id: "u6", wallet: "PqR6...kHg4", name: "LISA WONG", reputation: 45, sessionsCompleted: 12, status: "suspended", joined: "2026-01" },
]

const pendingFunding: FundingItem[] = [
  { id: "f1", requester: "ALEX RIVERA", amount: 5.0, reason: "Research on ZK rollup scalability for Solana", score: 92, status: "Pending" },
  { id: "f2", requester: "MIA CHEN", amount: 3.5, reason: "Smart contract audit workshop materials", score: 88, status: "Pending" },
  { id: "f3", requester: "ZARA OKONKWO", amount: 2.0, reason: "Web3 design system open-source project", score: 76, status: "Pending" },
]

export function AdminPanel() {
  const [activeSection, setActiveSection] = useState<"overview" | "users" | "funding">("overview")
  const [userSearch, setUserSearch] = useState("")
  const [actionMenu, setActionMenu] = useState<string | null>(null)

  const stats = defaultStats

  const statCards = [
    { icon: Users, label: "TOTAL USERS", value: stats.totalUsers.toLocaleString(), color: "text-primary" },
    { icon: CalendarCheck, label: "ACTIVE SESSIONS", value: stats.activeSessions.toString(), color: "text-accent" },
    { icon: Coins, label: "PENDING FUNDING", value: stats.pendingFunding.toString(), color: "text-secondary" },
    { icon: Activity, label: "TOTAL FEES (SOL)", value: stats.totalFees.toFixed(1), color: "text-amber-400" },
  ]

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.wallet.toLowerCase().includes(userSearch.toLowerCase())
  )

  const sectionTab = (tab: string) => cn(
    "px-4 py-2 text-xs font-mono font-medium uppercase tracking-wider rounded-sm transition-all duration-300",
    activeSection === tab
      ? "bg-primary/10 text-primary border border-primary/30 glow-neon"
      : "text-muted-foreground hover:text-foreground border border-transparent hover:border-border"
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <h2 className="text-sm font-mono font-bold text-foreground uppercase tracking-wider">ADMIN PANEL</h2>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2 border-b border-border pb-3">
        <button onClick={() => setActiveSection("overview")} className={sectionTab("overview")}>OVERVIEW</button>
        <button onClick={() => setActiveSection("users")} className={sectionTab("users")}>USERS</button>
        <button onClick={() => setActiveSection("funding")} className={sectionTab("funding")}>FUNDING REVIEW</button>
      </div>

      {/* Overview */}
      {activeSection === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {statCards.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="p-4 hover:glow-neon transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                          <p className="text-2xl font-bold font-mono text-foreground mt-1">{stat.value}</p>
                        </div>
                        <Icon className={cn("h-8 w-8 opacity-60", stat.color)} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recent activity */}
            <Card className="p-4">
              <CardContent className="p-0">
                <h3 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider mb-3">RECENT ACTIVITY</h3>
                <div className="space-y-2">
                  {[
                    { action: "New user registered", time: "2M AGO", type: "user" },
                    { action: "Session completed - Rust Review", time: "15M AGO", type: "session" },
                    { action: "Funding request approved - 2.0 SOL", time: "1H AGO", type: "funding" },
                    { action: "User flagged for review", time: "3H AGO", type: "alert" },
                  ].map((act, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-mono border-b border-border pb-2 last:border-0 last:pb-0">
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full shrink-0",
                        act.type === "user" ? "bg-primary" : act.type === "session" ? "bg-accent" : act.type === "funding" ? "bg-secondary" : "bg-destructive"
                      )} />
                      <span className="text-foreground flex-1 truncate">{act.action}</span>
                      <span className="text-muted-foreground shrink-0">{act.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick actions */}
            <Card className="p-4">
              <CardContent className="p-0">
                <h3 className="text-xs font-mono font-bold text-foreground uppercase tracking-wider mb-3">QUICK ACTIONS</h3>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "REVIEW FLAGS", count: "3", variant: "destructive" as const },
                    { label: "APPROVE FUNDING", count: "12", variant: "default" as const },
                    { label: "VERIFY USERS", count: "5", variant: "cyan" as const },
                    { label: "VIEW REPORTS", count: "", variant: "outline" as const },
                  ].map((action) => (
                    <Button key={action.label} variant={action.variant} size="sm" className="font-mono text-[10px] h-auto py-2 justify-between">
                      <span>{action.label}</span>
                      {action.count && <Badge variant="outline" className="ml-1 text-[9px] px-1">{action.count}</Badge>}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Users */}
      {activeSection === "users" && (
        <div className="space-y-4">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="SEARCH USERS..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="cyber-input w-full pl-10 font-mono text-xs"
            />
          </div>

          <div className="space-y-1">
            {filteredUsers.map((user, i) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between rounded-sm border border-border bg-card/50 px-4 py-3 hover:border-primary/20 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-primary/30 bg-primary/5 text-primary text-xs font-mono font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold font-mono text-foreground">{user.name}</p>
                      <Badge variant={user.status === "active" ? "default" : user.status === "suspended" ? "destructive" : "outline"} className="text-[9px] px-1 py-0">
                        {user.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      {user.wallet} &middot; JOINED {user.joined}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
                  <span>REP: <span className="text-primary font-bold">{user.reputation}</span></span>
                  <span>SESSIONS: <span className="text-accent font-bold">{user.sessionsCompleted}</span></span>
                </div>

                <div className="relative ml-3">
                  <button
                    onClick={() => setActionMenu(actionMenu === user.id ? null : user.id)}
                    className="p-1 rounded-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  {actionMenu === user.id && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setActionMenu(null)} />
                      <div className="absolute right-0 top-full mt-1 z-20 terminal-card p-1 min-w-[140px] space-y-0.5">
                        {[
                          { icon: Eye, label: "VIEW PROFILE" },
                          { icon: UserCheck, label: "ACTIVATE" },
                          { icon: Ban, label: "SUSPEND" },
                          { icon: Trash2, label: "REMOVE", danger: true },
                        ].map((act) => {
                          const Icon = act.icon
                          return (
                            <button
                              key={act.label}
                              onClick={() => setActionMenu(null)}
                              className={cn(
                                "flex w-full items-center gap-2 rounded-sm px-3 py-1.5 text-xs font-mono transition-colors",
                                act.danger ? "text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                              )}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              {act.label}
                            </button>
                          )
                        })}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Funding Review */}
      {activeSection === "funding" && (
        <div className="space-y-3">
          {pendingFunding.length === 0 ? (
            <div className="py-12 text-center">
              <Coins className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm font-mono text-muted-foreground">NO PENDING FUNDING REQUESTS</p>
            </div>
          ) : (
            pendingFunding.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-4 hover:bg-card/80 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold font-mono text-foreground">{item.requester}</p>
                          <Badge variant="outline" className="text-[9px]">{item.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.reason}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-sm font-mono font-bold text-primary">{item.amount.toFixed(2)} SOL</span>
                          <span className="text-[10px] font-mono text-muted-foreground">REP SCORE: {item.score}</span>
                        </div>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <Button size="sm" variant="default" className="font-mono text-[10px] h-8 gap-1">
                          <CheckCircle className="h-3 w-3" /> APPROVE
                        </Button>
                        <Button size="sm" variant="outline" className="font-mono text-[10px] h-8 gap-1 text-destructive border-destructive/50">
                          <XCircle className="h-3 w-3" /> REJECT
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
