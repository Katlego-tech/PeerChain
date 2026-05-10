"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Star, Users, BookOpen, Code, UserCheck } from "lucide-react"
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
  price: number
  tags: string[]
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "ALEX RIVERA",
    avatar: "AR",
    specialization: "SOLANA & RUST DEVELOPMENT",
    rating: 4.9,
    reviewCount: 127,
    price: 0.5,
    tags: ["CODE REVIEW", "MENTORSHIP"],
  },
  {
    id: "2",
    name: "MIA CHEN",
    avatar: "MC",
    specialization: "SMART CONTRACT AUDITING",
    rating: 4.8,
    reviewCount: 93,
    price: 0.75,
    tags: ["CODE REVIEW", "ONE-ON-ONE"],
  },
  {
    id: "3",
    name: "ZARA OKONKWO",
    avatar: "ZO",
    specialization: "WEB3 PRODUCT DESIGN",
    rating: 4.7,
    reviewCount: 214,
    price: 0.3,
    tags: ["MENTORSHIP", "GROUP STUDY"],
  },
  {
    id: "4",
    name: "KENJI TANAKA",
    avatar: "KT",
    specialization: "DEFI PROTOCOL ENGINEERING",
    rating: 4.9,
    reviewCount: 156,
    price: 1.0,
    tags: ["CODE REVIEW", "MENTORSHIP", "ONE-ON-ONE"],
  },
  {
    id: "5",
    name: "LYLA SANTIAGO",
    avatar: "LS",
    specialization: "ZERO-KNOWLEDGE PROOFS",
    rating: 4.6,
    reviewCount: 78,
    price: 0.6,
    tags: ["MENTORSHIP", "GROUP STUDY"],
  },
  {
    id: "6",
    name: "DARIUS ADEWALE",
    avatar: "DA",
    specialization: "AI & BLOCKCHAIN INTEGRATION",
    rating: 4.8,
    reviewCount: 142,
    price: 0.45,
    tags: ["CODE REVIEW", "MENTORSHIP", "ONE-ON-ONE"],
  },
]

const filterTags = ["ALL", "CODE REVIEW", "MENTORSHIP", "GROUP STUDY", "ONE-ON-ONE"]

export function LearningHub() {
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("ALL")

  const filtered = mentors.filter((mentor) => {
    const matchesFilter = activeFilter === "ALL" || mentor.tags.includes(activeFilter)
    const matchesSearch =
      mentor.name.toLowerCase().includes(search.toLowerCase()) ||
      mentor.specialization.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="SEARCH MENTORS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="cyber-input w-full pl-10 font-mono text-xs"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={cn(
              "rounded-sm border px-3 py-1.5 text-xs font-mono font-medium uppercase tracking-wider transition-all duration-300",
              activeFilter === tag
                ? "border-primary text-primary bg-primary/10 glow-neon"
                : "border-border text-muted-foreground bg-transparent hover:border-primary/50 hover:text-primary"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Card className="p-4 hover:glow-cyan transition-all duration-300 group h-full">
              <CardContent className="p-0 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-primary/30 bg-primary/5 text-primary text-sm font-mono font-bold">
                    {mentor.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold font-mono text-foreground tracking-tight">
                      {mentor.name}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground tracking-wider truncate">
                      {mentor.specialization}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="font-mono font-semibold">{mentor.rating}</span>
                    <span className="text-muted-foreground">({mentor.reviewCount})</span>
                  </div>
                  <div className="font-mono text-primary font-bold">
                    {mentor.price.toFixed(2)} SOL
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {mentor.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0.5">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button size="sm" className="w-full font-mono text-xs">
                  BOOK SESSION
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-sm font-mono text-muted-foreground tracking-wider">
            NO MENTORS FOUND
          </p>
        </div>
      )}
    </div>
  )
}
