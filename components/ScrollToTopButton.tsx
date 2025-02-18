"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export function ScrollToTopButton() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.pageYOffset > 300) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		window.addEventListener("scroll", toggleVisibility)

		return () => window.removeEventListener("scroll", toggleVisibility)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	return (
		<>
			{isVisible && (
				<Button
					onClick={scrollToTop}
					variant="outline" 
					size="icon"
					className="fixed border-black bottom-29 md:bottom-20 right-4 bg-input-light dark:bg-card-dark discord:bg-card-discord discord:text-white dark:border-white discord:border-white"
					aria-label="Scroll to top"
				>
					<ArrowUp className="w-4 h-4" />
				</Button>
			)}
		</>
	)
}

