"use client"

import { useMemo } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { ExternalLink, ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

interface Transaction {
  signature: string
  timestamp: string
  description: string
  type: "send" | "receive"
  amount: number
}

const mockTransactions: Transaction[] = [
  {
    signature: "5KLq...9XzP",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    description: "Payment for Code Review Session",
    type: "receive",
    amount: 0.5,
  },
  {
    signature: "3JmR...7tWq",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    description: "Mentorship Fee - Rust Workshop",
    type: "send",
    amount: 0.25,
  },
  {
    signature: "8xKp...2bLn",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    description: "Funding Distribution - Project Alpha",
    type: "receive",
    amount: 2.0,
  },
  {
    signature: "1FdG...4hVm",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    description: "Group Study Contribution",
    type: "send",
    amount: 0.1,
  },
  {
    signature: "7QrS...6kNj",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    description: "One-on-One Session Payment",
    type: "receive",
    amount: 1.0,
  },
]

function timeAgo(timestamp: string): string {
  const now = Date.now()
  const then = new Date(timestamp).getTime()
  const diffSeconds = Math.floor((now - then) / 1000)

  if (diffSeconds < 60) return `${diffSeconds}S AGO`
  const diffMinutes = Math.floor(diffSeconds / 60)
  if (diffMinutes < 60) return `${diffMinutes}M AGO`
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}H AGO`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}D AGO`
}

export function TransactionFeed() {
  const { connected } = useWallet()

  const transactions = useMemo(() => mockTransactions, [])

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Wallet className="h-10 w-10 text-muted-foreground/40 mb-4" />
        <p className="text-sm font-mono font-medium text-muted-foreground tracking-wider">
          CONNECT WALLET TO VIEW TRANSACTIONS
        </p>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm font-mono text-muted-foreground tracking-wider">
          NO TRANSACTIONS YET
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-1 max-h-[400px] overflow-y-auto pr-1">
      {transactions.map((tx) => {
        const isSend = tx.type === "send"
        return (
          <div
            key={tx.signature}
            className="flex items-center justify-between rounded-sm border border-border bg-card/50 px-3 py-2.5 hover:border-primary/20 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border",
                  isSend ? "border-secondary/30 text-secondary" : "border-primary/30 text-primary"
                )}
              >
                {isSend ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownLeft className="h-4 w-4" />
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {tx.description}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground">
                  {tx.signature} &middot; {timeAgo(tx.timestamp)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={cn(
                  "text-xs font-mono font-semibold",
                  isSend ? "text-secondary" : "text-primary"
                )}
              >
                {isSend ? "-" : "+"}{tx.amount.toFixed(2)} SOL
              </span>

              <a
                href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/50 hover:text-primary transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )
      })}
    </div>
  )
}
