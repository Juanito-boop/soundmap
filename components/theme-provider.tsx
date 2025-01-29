"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"
import themes from "@/lib/themes.json"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	React.useEffect(() => {
		const setThemeVariables = (theme: "light" | "dark") => {
			const root = document.documentElement
			Object.entries(themes[theme]).forEach(([key, value]) => {
				root.style.setProperty(`--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`, value as string)
			})
		}

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === "attributes" && mutation.attributeName === "class") {
					const isDark = document.documentElement.classList.contains("dark")
					setThemeVariables(isDark ? "dark" : "light")
				}
			})
		})

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		})

		setThemeVariables("dark")

		return () => observer.disconnect()
	}, [])

	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}