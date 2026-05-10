"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Star,
  Users,
  BookOpen,
  Code,
  ChevronDown,
  Filter,
  ArrowUpDown,
  UserCheck,
  GraduationCap,
  Globe,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Mentor {
  id: string
  name: string
  avatar: string
  specialization: string
  rating: number
  reviewCount: number
  sessionsCompleted: number
  price: number
  tags: string[]
  available: boolean
  bio: string
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "ALEX RIVERA",
    avatar: "AR",
    specialization: "SOLANA & RUST DEVELOPMENT",
    rating: 4.9,
    reviewCount: 127,
    sessionsCompleted: 342,
    price: 0.5,
    tags: ["CODE REVIEW", "MENTORSHIP", "RUST"],
    available: true,
    bio: "Senior Solana engineer with 5+ years in protocol development. Focused on helping devs master Rust and anchor frameworks.",
  },
  {
    id: "2",
    name: "MIA CHEN",
    avatar: "MC",
    specialization: "SMART CONTRACT AUDITING",
    rating: 4.8,
    reviewCount: 93,
    sessionsCompleted: 215,
    price: 0.75,
    tags: ["CODE REVIEW", "AUDITING", "SECURITY"],
    available: true,
    bio: "Certified smart contract auditor. Previously audited 50+ protocols across Solana and Ethereum ecosystems.",
  },
  {
    id: "3",
    name: "ZARA OKONKWO",
    avatar: "ZO",
    specialization: "WEB3 PRODUCT DESIGN",
    rating: 4.7,
    reviewCount: 214,
    sessionsCompleted: 489,
    price: 0.3,
    tags: ["MENTORSHIP", "DESIGN", "UX"],
    available: false,
    bio: "Product designer specializing in Web3 UX. Helped 10+ DeFi protocols achieve intuitive user experiences.",
  },
  {
    id: "4",
    name: "KENJI TANAKA",
    avatar: "KT",
    specialization: "DEFI PROTOCOL ENGINEERING",
    rating: 4.9,
    reviewCount: 156,
    sessionsCompleted: 401,
    price: 1.0,
    tags: ["CODE REVIEW", "MENTORSHIP", "DEFI"],
    available: true,
    bio: "DeFi architect who built several AMM protocols. Deep expertise in liquidity mechanisms and yield optimization.",
  },
  {
    id: "5",
    name: "LYLA SANTIAGO",
    avatar: "LS",
    specialization: "ZERO-KNOWLEDGE PROOFS",
    rating: 4.6,
    reviewCount: 78,
    sessionsCompleted: 156,
    price: 0.6,
    tags: ["MENTORSHIP", "ZK", "RESEARCH"],
    available: true,
    bio: "ZK researcher and practitioner. Specializes in practical implementations of zero-knowledge systems.",
  },
  {
    id: "6",
    name: "DARIUS ADEWALE",
    avatar: "DA",
    specialization: "AI & BLOCKCHAIN INTEGRATION",
    rating: 4.8,
    reviewCount: 142,
    sessionsCompleted: 298,
    price: 0.45,
    tags: ["CODE REVIEW", "MENTORSHIP", "AI"],
    available: true,
    bio: "Building the intersection of AI agents and blockchain. Experience with decentralized ML inference.",
  },
  {
    id: "7",
    name: "SELENA VAZQUEZ",
    avatar: "SV",
    specialization: "NFT & GAMING PROTOCOLS",
    rating: 4.5,
    reviewCount: 67,
    sessionsCompleted: 134,
    price: 0.35,
    tags: ["MENTORSHIP", "NFT", "GAMING"],
    available: true,
    bio: "NFT platform builder and gaming economist. Launched 3 successful gaming projects on Solana.",
  },
  {
    id: "8",
    name: "RAVI PATEL",
    avatar: "RP",
    specialization: "CROSS-CHAIN INFRASTRUCTURE",
    rating: 4.7,
    reviewCount: 109,
    sessionsCompleted: 267,
    price: 0.55,
    tags: ["CODE REVIEW", "MENTORSHIP", "INFRA"],
    available: false,
    bio: "Cross-chain messaging and bridge specialist. Core contributor to multiple interoperability protocols.",
  },
]

const allTags = Array.from(new Set(mentors.flatMap((m) => m.tags)))
const sortOptions = [
  { value: "rating", label: "HIGHEST RATED" },
  { value: "price-low", label: "PRICE: LOW TO HIGH" },
  { value: "price-high", label: "PRICE: HIGH TO LOW" },
  { value: "sessions", label: "MOST SESSIONS" },
]

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      <Star className="h-3.5 w-3.5 fill-current" />
      <span className="font-mono font-semibold text-xs">{rating.toFixed(1)}</span>
      <span className="text-muted-foreground text-[10px]">({count})</span>
    </div>
  )
}

export function MentorMarketplace() {
  const [search, setSearch] = useState("")
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState("rating")
  const [sortOpen, setSortOpen] = useState(false)
  const [showAvailable, setShowAvailable] = useState(false)

  const toggleTag = (tag: string) => {
    const next = new Set(activeTags)
    if (next.has(tag)) next.delete(tag)
    else next.add(tag)
    setActiveTags(next)
  }

  let filtered = mentors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.specialization.toLowerCase().includes(search.toLowerCase())
    const matchesTags =
      activeTags.size === 0 || activeTags.intersection
        ? Array.from(activeTags).some((t) => m.tags.includes(t))
        : true
    const matchesAvailable = showAvailable ? m.available : true
    return matchesSearch && matchesTags && matchesAvailable
  })

  // Sort
  filtered = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price
      case "price-high": return b.price - a.price
      case "sessions": return b.sessionsCompleted - a.sessionsCompleted
      default: return b.rating - a.rating
    }
  })

  const sortLabel = sortOptions.find((o) => o.value === sortBy)?.label || "SORT"

  return (
    <div className="space-y-6">
      {/* Search + Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="SEARCH MENTORS BY NAME OR SKILL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="cyber-input w-full pl-10 font-mono text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAvailable(!showAvailable)}
            className={cn(
              "rounded-sm border px-3 py-2 text-xs font-mono font-medium uppercase tracking-wider transition-all duration-300 flex items-center gap-2",
              showAvailable
                ? "border-primary text-primary bg-primary/10 glow-neon"
                : "border-border text-muted-foreground bg-transparent hover:border-primary/50 hover:text-primary"
            )}
          >
            <UserCheck className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">AVAILABLE</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="rounded-sm border border-border px-3 py-2 text-xs font-mono font-medium uppercase tracking-wider transition-all duration-300 flex items-center gap-2 hover:border-primary/50 hover:text-primary"
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="hidden sm:inline">{sortLabel}</span>
              <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", sortOpen && "rotate-180")} />
            </button>
            {sortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                <div className="absolute right-0 top-full mt-1 z-20 terminal-card p-1 min-w-[180px] space-y-0.5">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                      className={cn(
                        "flex w-full items-center rounded-sm px-3 py-2 text-xs font-mono transition-colors",
                        opt.value === sortBy
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 mr-2 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          <Filter className="h-3 w-3" />
          FILTERS:
        </div>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={cn(
              "rounded-sm border px-2.5 py-1 text-[11px] font-mono font-medium uppercase tracking-wider transition-all duration-300",
              activeTags.has(tag)
                ? "border-primary text-primary bg-primary/10 glow-neon"
                : "border-border text-muted-foreground bg-transparent hover:border-primary/50 hover:text-primary"
            )}
          >
            {tag}
          </button>
        ))}
        {activeTags.size > 0 && (
          <button
            onClick={() => setActiveTags(new Set())}
            className="text-[11px] font-mono text-destructive hover:underline ml-1"
          >
            CLEAR
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-[11px] font-mono text-muted-foreground tracking-wider">
        {filtered.length} MENTOR{filtered.length !== 1 ? "S" : ""} FOUND
      </p>

      {/* Mentor grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
          >
            <Card className={cn(
              "p-4 transition-all duration-300 group h-full flex flex-col",
              mentor.available ? "hover:glow-neon" : "opacity-70"
            )}>
              <CardContent className="p-0 space-y-4 flex flex-col h-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-primary/30 bg-primary/5 text-primary text-sm font-mono font-bold">
                      {mentor.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold font-mono text-foreground tracking-tight">
                        {mentor.name}
                      </p>
                      <p className="text-[10px] font-mono text-muted-foreground tracking-wider truncate max-w-[140px]">
                        {mentor.specialization}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "h-2 w-2 rounded-full shrink-0 mt-1.5",
                    mentor.available ? "bg-primary" : "bg-muted-foreground"
                  )} />
                </div>

                <p className="text-[11px] font-mono text-muted-foreground leading-relaxed line-clamp-2">
                  {mentor.bio}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <StarRating rating={mentor.rating} count={mentor.reviewCount} />
                  <div className="flex items-center gap-1 text-muted-foreground text-[10px] font-mono">
                    <BookOpen className="h-3 w-3" />
                    {mentor.sessionsCompleted}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {mentor.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[9px] px-1.5 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto pt-2 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-lg font-bold text-primary">
                      {mentor.price.toFixed(2)} <span className="text-[10px] font-normal text-muted-foreground">SOL</span>
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">PER SESSION</span>
                  </div>
                  <Button
                    size="sm"
                    className="w-full font-mono text-xs gap-2"
                    disabled={!mentor.available}
                  >
                    <Zap className="h-3.5 w-3.5" />
                    {mentor.available ? "BOOK SESSION" : "UNAVAILABLE"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <Users className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-sm font-mono text-muted-foreground tracking-wider">NO MENTORS MATCH YOUR CRITERIA</p>
          <p className="text-xs font-mono text-muted-foreground/60 mt-2">TRY ADJUSTING FILTERS OR SEARCH TERMS</p>
        </div>
      )}
    </div>
  )
}
