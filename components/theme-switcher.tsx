"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			variant="default"
			size="icon"
			aria-label="Toggle theme"
			className="rounded-full"
		>
			{theme === "dark" ? <Sun className="size-[1.2rem]" /> : <Moon className="size-[1.2rem]" />}
		</Button>
	)
}

