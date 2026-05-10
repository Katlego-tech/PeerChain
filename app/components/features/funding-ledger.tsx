"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useSWR from "swr"
import {
  Plus,
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  User,
  Coins,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const fetcher = (url: string) =>
  fetch(url).then((res) => res.json()).then((json) => json.data || json)

interface FundingRequest {
  id: string
  requester: string
  amount: number
  reason: string
  reputationScore: number
  status: "Pending" | "Approved" | "Rejected" | "Distributed"
  timestamp: string
}

const statusConfig = {
  Pending: { variant: "outline" as const, icon: Clock, color: "text-accent" },
  Approved: { variant: "default" as const, icon: CheckCircle, color: "text-primary" },
  Rejected: { variant: "destructive" as const, icon: XCircle, color: "text-destructive" },
  Distributed: { variant: "cyan" as const, icon: Send, color: "text-accent" },
}

function formatTimeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}M AGO`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}H AGO`
  const days = Math.floor(hrs / 24)
  return `${days}D AGO`
}

export function FundingLedger() {
  const { data, error, isLoading } = useSWR<FundingRequest[]>(
    "/api/funding?user=test",
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false, dedupingInterval: 10000 }
  )

  const [modalOpen, setModalOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [reason, setReason] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const requests = data || []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    setModalOpen(false)
    setAmount("")
    setReason("")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-muted-foreground tracking-wider">
          {isLoading ? "LOADING..." : `${requests.length} REQUEST(S)`}
        </p>
        <Button size="sm" className="font-mono text-xs gap-2" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          REQUEST FUNDING
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="rounded-sm border border-destructive/50 bg-destructive/5 p-4 text-center">
          <p className="text-sm font-mono text-destructive">FAILED TO LOAD FUNDING DATA</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Coins className="h-10 w-10 text-muted-foreground/40 mb-4" />
          <p className="text-sm font-mono text-muted-foreground tracking-wider">
            NO FUNDING REQUESTS YET
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 font-mono text-xs"
            onClick={() => setModalOpen(true)}
          >
            CREATE FIRST REQUEST
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {requests.map((req, index) => {
            const status = statusConfig[req.status]
            const StatusIcon = status.icon
            return (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="p-3 hover:bg-card/80 transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-muted">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-mono font-bold text-foreground">
                              {req.requester}
                            </p>
                            <Badge variant={status.variant} className="text-[10px] gap-1">
                              <StatusIcon className="h-3 w-3" />
                              {req.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {req.reason}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-xs font-mono text-primary font-semibold">
                              {req.amount.toFixed(2)} SOL
                            </span>
                            <span className="text-[10px] font-mono text-muted-foreground">
                              SCORE: {req.reputationScore}
                            </span>
                            <span className="text-[10px] font-mono text-muted-foreground">
                              {formatTimeAgo(req.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <>
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="w-full max-w-md terminal-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-mono font-bold text-foreground uppercase tracking-wider">
                    Request Funding
                  </h2>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Amount (SOL)"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Reason
                    </label>
                    <textarea
                      placeholder="DESCRIBE YOUR FUNDING REQUEST..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      required
                      rows={4}
                      className="cyber-input w-full resize-none font-mono text-xs"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full font-mono text-xs gap-2"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        SUBMITTING...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        SUBMIT REQUEST
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
