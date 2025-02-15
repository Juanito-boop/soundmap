"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ClearSearchButton() {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const handleClear = () => {
		if (typeof window !== "undefined" && (window as any).clearArtistSearch) {
			; (window as any).clearArtistSearch()
		}
	}

	if (!isMounted) {
		return null
	}

	return (
		<Button onClick={handleClear} variant="default" className="button-50">
			Clear Search
		</Button>
	)
}

