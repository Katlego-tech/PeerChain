"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Lock, User, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"

export default function RegisterPage() {
  const router = useRouter()
  const { user, loading, error, register, clearError } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (user) router.push("/dashboard")
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setSubmitting(true)
    await register(email, password, name)
    setSubmitting(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md px-4"
      >
        <div className="terminal-card p-8 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold font-mono tracking-[0.15em] text-secondary glow-magenta inline-block px-4">
              REGISTER
            </h1>
            <p className="text-xs font-mono text-muted-foreground tracking-wider">
              JOIN THE STUDYSTREAM NETWORK
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="NAME (OPTIONAL)"
                type="text"
                placeholder="YOUR DISPLAY NAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-mono text-xs"
              />
              <Input
                label="EMAIL"
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-mono text-xs"
                required
              />
              <Input
                label="PASSWORD"
                type="password"
                placeholder="MINIMUM 6 CHARACTERS"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-mono text-xs"
                minLength={6}
                required
              />

              {error && (
                <p className="text-xs font-mono text-destructive text-center">{error}</p>
              )}

              <Button type="submit" className="w-full h-12 font-mono text-xs gap-2" disabled={submitting}>
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> CREATING ACCOUNT...</>
                ) : (
                  <>CREATE ACCOUNT <ArrowRight className="h-4 w-4" /></>
                )}
              </Button>

              <p className="text-[10px] font-mono text-muted-foreground text-center">
                By registering, you agree to our{" "}
                <Link href="/terms" className="text-primary hover:underline">Terms</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            </form>
          )}

          <div className="text-center space-y-3 pt-2">
            <p className="text-[11px] font-mono text-muted-foreground">
              ALREADY HAVE AN ACCOUNT?{" "}
              <Link href="/auth/signin" className="text-primary hover:underline underline-offset-4">
                SIGN IN
              </Link>
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              BACK TO HOME
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
