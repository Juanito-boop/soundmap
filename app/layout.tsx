import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeSwitcher } from "@/components/theme-switcher"
import KoFi from "@/components/ko-fi"
import { ClearSearchButton } from "@/components/ClearSearchButton"
import type React from "react"
import { ScrollToTopButton } from "@/components/ScrollToTopButton"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Soundmap Artist Guesser",
	description: "soundmap user: VXN.",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/image.svg" sizes="any" />
			</head>
			<body className={inter.className}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
					<div className="fixed left-0 right-0 z-10 flex items-end justify-between px-4 bottom-10 md:bottom-4">
						<KoFi />
						<div className="absolute bottom-0 transform -translate-x-1/2 left-1/2 mb-17 md:my-auto">
							<ClearSearchButton />
						</div>
						<ScrollToTopButton />
						<ThemeSwitcher />
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}

