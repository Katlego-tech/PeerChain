"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const footerLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
]

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="border-t border-border bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="text-lg font-bold tracking-[0.25em] text-primary font-mono">
              STUDYSTREAM
            </Link>
            <p className="text-xs font-mono font-medium tracking-wider text-muted-foreground">
              PROOF OF LEARNING &bull; POWERED BY SOLANA
            </p>
          </div>

          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => {
              const isExternal = link.href.startsWith("http")
              if (isExternal) {
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                )
              }
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs font-mono text-muted-foreground">
            &copy; {new Date().getFullYear()} STUDYSTREAM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
