"use client"

import { useState, useCallback, useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useConnection } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { motion, AnimatePresence } from "framer-motion"
import { Wallet, Copy, ExternalLink, LogOut, ChevronDown, Loader2, Hexagon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMetaMask } from "@/lib/use-metamask"

function truncateAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export function ConnectWallet() {
  const { publicKey, disconnect, connected, connecting } = useWallet()
  const { connection } = useConnection()
  const [open, setOpen] = useState(false)
  const [balance, setBalance] = useState<number | null>(null)
  const [copying, setCopying] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  const { setVisible } = useWalletModal()
  const metamask = useMetaMask()

  const fetchBalance = useCallback(async () => {
    if (publicKey) {
      try {
        const bal = await connection.getBalance(publicKey)
        setBalance(bal / 1e9)
      } catch {
        setBalance(null)
      }
    }
  }, [publicKey, connection])

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance()
    }
  }, [connected, publicKey, fetchBalance])

  const handleCopySolana = async () => {
    if (publicKey) {
      setCopying(true)
      await navigator.clipboard.writeText(publicKey.toBase58())
      setTimeout(() => setCopying(false), 1500)
    }
  }

  const handleCopyEvm = async () => {
    if (metamask.account) {
      setCopying(true)
      await navigator.clipboard.writeText(metamask.account)
      setTimeout(() => setCopying(false), 1500)
    }
  }

  const handleDisconnectAll = () => {
    if (connected) disconnect()
    if (metamask.account) metamask.disconnect()
    setOpen(false)
  }

  const walletActive = connected && publicKey
  const mmActive = !!metamask.account

    const handleConnectSolana = () => {
    setVisible(true)
  }

  if (connecting || metamask.connecting) {
    return (
      <Button variant="outline" className="font-mono text-xs gap-2" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
        CONNECTING
      </Button>
    )
  }

  if (!walletActive && !mmActive) {
    return (
      <div className="relative">
        <Button variant="outline" className="font-mono text-xs gap-2" onClick={() => setShowPicker(!showPicker)}>
          <Wallet className="h-4 w-4" />
          CONNECT WALLET
          <ChevronDown className={cn("h-3 w-3 transition-transform", showPicker && "rotate-180")} />
        </Button>
        <AnimatePresence>
          {showPicker && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowPicker(false)} />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 z-50 w-56 terminal-card p-2 space-y-1"
              >
                <button
                  onClick={() => { handleConnectSolana(); setShowPicker(false) }}
                  className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-xs font-mono text-foreground hover:bg-white/5 transition-colors"
                >
                  <Wallet className="h-4 w-4 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold">SOLANA WALLET</p>
                    <p className="text-[10px] text-muted-foreground">Phantom / Solflare</p>
                  </div>
                </button>
                {metamask.isAvailable && (
                  <button
                    onClick={() => { metamask.connect(); setShowPicker(false) }}
                    className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-xs font-mono text-foreground hover:bg-white/5 transition-colors"
                  >
                    <Hexagon className="h-4 w-4 text-accent" />
                    <div className="text-left">
                      <p className="font-semibold">METAMASK</p>
                      <p className="text-[10px] text-muted-foreground">EVM Wallet</p>
                    </div>
                  </button>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="relative">
      <Button variant="outline" className="font-mono text-xs gap-2" onClick={() => setOpen(!open)}>
        <span className={cn("h-2 w-2 rounded-full animate-pulse", mmActive ? "bg-accent" : "bg-primary")} />
        {mmActive ? truncateAddress(metamask.account!) : truncateAddress(publicKey!.toBase58())}
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-50 w-64 terminal-card p-4 space-y-3"
            >
              {walletActive && (
                <>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    <Wallet className="h-3.5 w-3.5 text-primary" />
                    SOLANA
                  </div>
                  <div className="font-mono text-xs text-foreground break-all">
                    {publicKey!.toBase58()}
                  </div>
                  {balance !== null && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground font-mono">BALANCE:</span>
                      <span className="text-primary font-mono font-semibold">{balance.toFixed(4)} SOL</span>
                    </div>
                  )}
                  <div className="flex gap-1">
                    <button onClick={handleCopySolana} className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-[10px] font-mono text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors">
                      <Copy className="h-3 w-3" /> {copying ? "COPIED!" : "COPY"}
                    </button>
                    <a href={`https://explorer.solana.com/address/${publicKey!.toBase58()}?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-[10px] font-mono text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors">
                      <ExternalLink className="h-3 w-3" /> EXPLORER
                    </a>
                  </div>
                  {!mmActive && <div className="border-t border-border" />}
                </>
              )}

              {mmActive && (
                <>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    <Hexagon className="h-3.5 w-3.5 text-accent" />
                    METAMASK
                  </div>
                  <div className="font-mono text-xs text-foreground break-all">{metamask.account}</div>
                  {metamask.balance !== null && (
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground font-mono">BALANCE:</span>
                      <span className="text-accent font-mono font-semibold">{metamask.balance} ETH</span>
                    </div>
                  )}
                  <div className="flex gap-1">
                    <button onClick={handleCopyEvm} className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-[10px] font-mono text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors">
                      <Copy className="h-3 w-3" /> {copying ? "COPIED!" : "COPY"}
                    </button>
                    <a href={`https://etherscan.io/address/${metamask.account}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-[10px] font-mono text-muted-foreground hover:text-primary hover:bg-white/5 transition-colors">
                      <ExternalLink className="h-3 w-3" /> ETHERSCAN
                    </a>
                  </div>
                  {!walletActive && <div className="border-t border-border" />}
                </>
              )}

              {(walletActive || mmActive) && (
                <div className="border-t border-border pt-3">
                  <button onClick={handleDisconnectAll} className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-xs font-mono text-destructive hover:text-destructive hover:bg-white/5 transition-colors">
                    <LogOut className="h-3.5 w-3.5" />
                    DISCONNECT {walletActive && mmActive ? "ALL" : ""}
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
