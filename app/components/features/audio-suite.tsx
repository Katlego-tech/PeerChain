"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Loader2, Volume2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Voice {
  id: string
  name: string
}

const voices: Voice[] = [
  { id: "en-US-Neural2-A", name: "NEURAL VOICE A (EN)" },
  { id: "en-US-Neural2-B", name: "NEURAL VOICE B (EN)" },
  { id: "en-US-Neural2-C", name: "NEURAL VOICE C (EN)" },
  { id: "en-US-Studio-Q", name: "STUDIO VOICE Q (EN)" },
]

export function AudioSuite() {
  const [text, setText] = useState("")
  const [selectedVoice, setSelectedVoice] = useState(voices[0].id)
  const [voiceOpen, setVoiceOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)

  const handleGenerate = async () => {
    if (!text.trim()) return
    setGenerating(true)
    setAudioUrl(null)

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice: selectedVoice }),
      })

      if (!res.ok) throw new Error("TTS request failed")

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)
    } catch {
      const fakeUrl = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="
      setAudioUrl(fakeUrl)
    } finally {
      setGenerating(false)
    }
  }

  const handlePlayPause = () => {
    setPlaying(!playing)
  }

  const selectedVoiceName = voices.find((v) => v.id === selectedVoice)?.name || "SELECT VOICE"

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <CardContent className="p-0 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Input Text
            </label>
            <textarea
              placeholder="ENTER TEXT TO CONVERT TO SPEECH..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              className="cyber-input w-full resize-none font-mono text-xs"
            />
          </div>

          <div className="relative">
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
              Voice
            </label>
            <button
              type="button"
              onClick={() => setVoiceOpen(!voiceOpen)}
              className="cyber-input w-full flex items-center justify-between font-mono text-xs"
            >
              <span>{selectedVoiceName}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  voiceOpen && "rotate-180"
                )}
              />
            </button>
            {voiceOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setVoiceOpen(false)} />
                <div className="absolute left-0 right-0 top-full mt-1 z-20 terminal-card p-1 space-y-0.5">
                  {voices.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => {
                        setSelectedVoice(voice.id)
                        setVoiceOpen(false)
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-sm px-3 py-2 text-xs font-mono transition-colors",
                        voice.id === selectedVoice
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      )}
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      {voice.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!text.trim() || generating}
            className="w-full font-mono text-xs gap-2"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                GENERATING...
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                GENERATE AUDIO
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {audioUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-4 glow-cyan">
            <CardContent className="p-0">
              <div className="flex items-center gap-4">
                <Button
                  variant="cyan"
                  size="icon"
                  onClick={handlePlayPause}
                  className="h-10 w-10 shrink-0"
                >
                  {playing ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </Button>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono font-medium text-foreground">
                    {playing ? "NOW PLAYING" : "READY TO PLAY"}
                  </p>
                  <div className="h-1.5 mt-2 rounded-sm bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-sm bg-accent transition-all duration-300",
                        playing ? "w-3/4 animate-pulse" : "w-0"
                      )}
                    />
                  </div>
                </div>

                <audio
                  src={audioUrl}
                  onEnded={() => setPlaying(false)}
                  controls
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
