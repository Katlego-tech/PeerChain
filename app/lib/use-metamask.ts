"use client"

import { useState, useCallback, useEffect } from "react"
import { BrowserProvider, formatEther } from "ethers"

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, handler: (...args: unknown[]) => void) => void
      removeListener: (event: string, handler: (...args: unknown[]) => void) => void
    }
  }
}

export function useMetaMask() {
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isAvailable = typeof window !== "undefined" && !!window.ethereum?.isMetaMask

  const getBalance = useCallback(async (addr: string) => {
    if (!window.ethereum) return
    const provider = new BrowserProvider(window.ethereum)
    const bal = await provider.getBalance(addr)
    setBalance(parseFloat(formatEther(bal)).toFixed(4))
  }, [])

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      setError("MetaMask not detected")
      return
    }
    setConnecting(true)
    setError(null)
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" }) as string[]
      const chain = await window.ethereum.request({ method: "eth_chainId" }) as string
      setAccount(accounts[0])
      setChainId(chain)
      await getBalance(accounts[0])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect")
    } finally {
      setConnecting(false)
    }
  }, [getBalance])

  const disconnect = useCallback(() => {
    setAccount(null)
    setBalance(null)
    setChainId(null)
    setError(null)
  }, [])

  useEffect(() => {
    if (!window.ethereum) return
    const handleAccountsChanged = (accounts: unknown) => {
      const accs = accounts as string[]
      if (accs.length === 0) {
        disconnect()
      } else {
        setAccount(accs[0])
        getBalance(accs[0])
      }
    }
    const handleChainChanged = () => {
      window.location.reload()
    }
    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", handleChainChanged)
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged)
      window.ethereum?.removeListener("chainChanged", handleChainChanged)
    }
  }, [disconnect, getBalance])

  return { account, balance, chainId, connecting, error, isAvailable, connect, disconnect }
}
