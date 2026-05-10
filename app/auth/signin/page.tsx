"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Wallet, Mail, Lock, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"

export default function SignInPage() {
  const router = useRouter()
  const { user, loading, error, login, clearError } = useAuth()
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
    await login(email, password)
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
            <h1 className="text-2xl font-bold font-mono tracking-[0.15em] text-primary glow-neon inline-block px-4">
              SIGN IN
            </h1>
            <p className="text-xs font-mono text-muted-foreground tracking-wider">
              ACCESS YOUR STUDYSTREAM TERMINAL
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              <Button variant="outline" className="w-full h-12 font-mono text-xs gap-3 border-primary/50 hover:border-primary hover:glow-neon hover:bg-primary/5">
                <Wallet className="h-4 w-4 text-primary" />
                CONNECT WALLET
              </Button>

              <div className="relative">
                <Separator className="bg-border" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                  Or continue with email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="EMAIL"
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-mono text-xs"
                  required
                />
                <Input
                  label="PASSWORD"
                  type="password"
                  placeholder="ENTER YOUR PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="font-mono text-xs"
                  required
                />

                {error && (
                  <p className="text-xs font-mono text-destructive text-center">{error}</p>
                )}

                <Button type="submit" className="w-full h-12 font-mono text-xs gap-2" disabled={submitting}>
                  {submitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> SIGNING IN...</>
                  ) : (
                    <>SIGN IN <ArrowRight className="h-4 w-4" /></>
                  )}
                </Button>
              </form>
            </div>
          )}

          <div className="text-center space-y-3 pt-2">
            <p className="text-[11px] font-mono text-muted-foreground">
              DON&apos;T HAVE AN ACCOUNT?{" "}
              <Link href="/auth/register" className="text-primary hover:underline underline-offset-4">
                REGISTER
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
