"use client"

import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboard, GraduationCap, Wallet, AudioWaveform, Users, Award, Calendar, Shield } from "lucide-react"

const tabConfig = [
  { id: "dashboard", label: "DASHBOARD", icon: LayoutDashboard, path: "/dashboard" },
  { id: "learning", label: "LEARNING", icon: GraduationCap, path: "/dashboard/learning" },
  { id: "mentors", label: "MENTORS", icon: Users, path: "/dashboard/mentors" },
  { id: "funding", label: "FUNDING", icon: Wallet, path: "/dashboard/funding" },
  { id: "sessions", label: "SESSIONS", icon: Calendar, path: "/dashboard/sessions" },
  { id: "reputation", label: "REPUTATION", icon: Award, path: "/dashboard/reputation" },
  { id: "audio", label: "AUDIO", icon: AudioWaveform, path: "/dashboard/audio" },
  { id: "admin", label: "ADMIN", icon: Shield, path: "/dashboard/admin" },
] as const

function getActiveTab(pathname: string): string {
  if (pathname === "/dashboard") return "dashboard"
  const segment = pathname.replace("/dashboard/", "").split("/")[0]
  return tabConfig.find((t) => t.id === segment)?.id || "dashboard"
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const activeTab = getActiveTab(pathname)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={(v) => {
          const tab = tabConfig.find((t) => t.id === v)
          if (tab) router.push(tab.path)
        }} className="space-y-6">
          <TabsList className="w-full sm:w-auto overflow-x-auto">
            {tabConfig.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </Tabs>
      </main>
    </div>
  )
}
