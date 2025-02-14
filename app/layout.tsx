import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeSwitcher } from "@/components/theme-switcher"
import KoFi from "@/components/ko-fi"
import { ClearSearchButton } from "@/components/ClearSearchButton"
import type React from "react"

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
					<div className="fixed bottom-4 left-0 right-0 flex justify-between items-end px-4 z-10">
						<KoFi />
						<div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 mb-17 md:my-auto">
							<ClearSearchButton />
						</div>
						<ThemeSwitcher />
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}

