"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Plus,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Session {
  id: string
  mentor: string
  mentorAvatar: string
  topic: string
  date: string
  time: string
  duration: number
  status: "confirmed" | "pending" | "completed" | "cancelled"
  type: "video" | "in-person"
  price: number
}

const sessions: Session[] = [
  {
    id: "s1",
    mentor: "ALEX RIVERA",
    mentorAvatar: "AR",
    topic: "Rust Smart Contract Review",
    date: "2026-05-12",
    time: "14:00",
    duration: 60,
    status: "confirmed",
    type: "video",
    price: 0.5,
  },
  {
    id: "s2",
    mentor: "MIA CHEN",
    mentorAvatar: "MC",
    topic: "Audit Methodology Deep Dive",
    date: "2026-05-14",
    time: "10:00",
    duration: 90,
    status: "confirmed",
    type: "video",
    price: 0.75,
  },
  {
    id: "s3",
    mentor: "KENJI TANAKA",
    mentorAvatar: "KT",
    topic: "DeFi Protocol Architecture",
    date: "2026-05-11",
    time: "16:00",
    duration: 60,
    status: "completed",
    type: "video",
    price: 1.0,
  },
  {
    id: "s4",
    mentor: "ZARA OKONKWO",
    mentorAvatar: "ZO",
    topic: "Web3 UX Portfolio Review",
    date: "2026-05-18",
    time: "11:00",
    duration: 45,
    status: "pending",
    type: "video",
    price: 0.3,
  },
  {
    id: "s5",
    mentor: "DARIUS ADEWALE",
    mentorAvatar: "DA",
    topic: "AI Agent Integration Workshop",
    date: "2026-05-09",
    time: "15:00",
    duration: 60,
    status: "cancelled",
    type: "video",
    price: 0.45,
  },
]

const statusConfig = {
  confirmed: { label: "CONFIRMED", variant: "default" as const, icon: CheckCircle },
  pending: { label: "PENDING", variant: "outline" as const, icon: AlertCircle },
  completed: { label: "COMPLETED", variant: "cyan" as const, icon: CheckCircle },
  cancelled: { label: "CANCELLED", variant: "destructive" as const, icon: XCircle },
}

const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

export function SessionBooking() {
  const [filter, setFilter] = useState<string>("all")
  const [showBook, setShowBook] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [bookingForm, setBookingForm] = useState({ mentor: "", topic: "", date: "", time: "", duration: "60" })

  const filtered = filter === "all" ? sessions : sessions.filter((s) => s.status === filter)

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setShowBook(false)
    setBookingForm({ mentor: "", topic: "", date: "", time: "", duration: "60" })
  }

  const filters = [
    { value: "all", label: "ALL" },
    { value: "confirmed", label: "CONFIRMED" },
    { value: "pending", label: "PENDING" },
    { value: "completed", label: "COMPLETED" },
    { value: "cancelled", label: "CANCELLED" },
  ]

  return (
    <div className="space-y-6">
      {/* Header + Book button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-sm border px-3 py-1.5 text-[11px] font-mono font-medium uppercase tracking-wider transition-all duration-300",
                filter === f.value
                  ? "border-primary text-primary bg-primary/10 glow-neon"
                  : "border-border text-muted-foreground bg-transparent hover:border-primary/50 hover:text-primary"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Button size="sm" className="font-mono text-xs gap-2" onClick={() => setShowBook(true)}>
          <Plus className="h-4 w-4" />
          BOOK SESSION
        </Button>
      </div>

      {/* Session list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <Calendar className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm font-mono text-muted-foreground tracking-wider">
              NO {filter === "all" ? "" : filter.toUpperCase()} SESSIONS
            </p>
          </div>
        ) : (
          filtered.map((session, i) => {
            const status = statusConfig[session.status]
            const StatusIcon = status.icon
            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={cn(
                  "p-4 transition-all duration-300 hover:bg-card/80",
                  session.status === "cancelled" && "opacity-60"
                )}>
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-primary/30 bg-primary/5 text-primary text-sm font-mono font-bold">
                          {session.mentorAvatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-bold font-mono text-foreground">{session.mentor}</p>
                            <Badge variant={status.variant} className="text-[9px] gap-1 px-1.5 py-0.5">
                              <StatusIcon className="h-3 w-3" />
                              {status.label}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{session.topic}</p>
                          <div className="flex items-center gap-4 mt-2 text-[10px] font-mono text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {session.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {session.time} ({session.duration}MIN)
                            </span>
                            <span className="flex items-center gap-1">
                              {session.type === "video" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                              {session.type === "video" ? "VIDEO" : "IN-PERSON"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-mono font-bold text-primary">{session.price.toFixed(2)} SOL</p>
                        {session.status === "confirmed" && (
                          <Button size="sm" variant="outline" className="mt-2 text-[10px] h-7 px-2">
                            JOIN
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Book Session Modal */}
      {showBook && (
        <>
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={() => setShowBook(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-lg terminal-card p-6 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-mono font-bold text-foreground uppercase tracking-wider">
                  BOOK NEW SESSION
                </h2>
                <button onClick={() => setShowBook(false)} className="text-muted-foreground hover:text-foreground">
                  <XCircle className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleBook} className="space-y-4">
                <Input
                  label="MENTOR"
                  placeholder="ENTER MENTOR NAME"
                  value={bookingForm.mentor}
                  onChange={(e) => setBookingForm({ ...bookingForm, mentor: e.target.value })}
                  required
                />
                <Input
                  label="TOPIC"
                  placeholder="SESSION TOPIC"
                  value={bookingForm.topic}
                  onChange={(e) => setBookingForm({ ...bookingForm, topic: e.target.value })}
                  required
                />
                <Input
                  label="DATE"
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  required
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    TIME SLOT
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => { setSelectedSlot(slot); setBookingForm({ ...bookingForm, time: slot }) }}
                        className={cn(
                          "rounded-sm border px-2 py-2 text-[10px] font-mono transition-all duration-300",
                          selectedSlot === slot
                            ? "border-primary text-primary bg-primary/10 glow-neon"
                            : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  label="DURATION (MINUTES)"
                  type="number"
                  min="15"
                  step="15"
                  value={bookingForm.duration}
                  onChange={(e) => setBookingForm({ ...bookingForm, duration: e.target.value })}
                  required
                />

                <div className="pt-2 border-t border-border">
                  <Button type="submit" className="w-full font-mono text-xs gap-2" disabled={submitting}>
                    {submitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> BOOKING...</>
                    ) : (
                      <><Calendar className="h-4 w-4" /> CONFIRM BOOKING</>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </div>
  )
}
