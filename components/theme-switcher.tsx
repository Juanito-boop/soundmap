"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed bottom-4 right-4">
      {/* <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button> */}
    </div>
  )
}

