"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import themes from "@/lib/themes.json"

export function ThemeSwitcher() {
	const [isOpen, setIsOpen] = useState(false)
	const { theme, setTheme } = useTheme()

	return (
		<div className="fixed bottom-4 right-4">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
			>
				{theme === "dark" ? <Moon size={24} /> : <Sun size={24} />}
			</button>
			{isOpen && (
				<div className="absolute bottom-12 right-0 bg-background border border-border rounded-lg shadow-lg p-2 flex flex-col gap-2">
					{Object.keys(themes).map((themeName) => (
						<button
							key={themeName}
							onClick={() => {
								setTheme(themeName)
								setIsOpen(false)
							}}
							className="flex items-center gap-2 px-3 py-2 rounded hover:bg-accent"
						>
							{themeName === "dark" ? <Moon size={16} /> : <Sun size={16} />}{" "}
							{themeName.charAt(0).toUpperCase() + themeName.slice(1)}
						</button>
					))}
				</div>
			)}
		</div>
	)
}

