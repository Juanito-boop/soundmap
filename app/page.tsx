"use client"

import { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ArtistFinder } from "@/components/ArtistFinder"

export default function Page() {
	const [isDomLoaded, setIsDomLoaded] = useState(false);
	const queryClient = new QueryClient()

	useEffect(() => {
		setIsDomLoaded(true);
	}, []);

	return (
		isDomLoaded && (
			<QueryClientProvider client={queryClient}>
				<ArtistFinder />
			</QueryClientProvider>
		)
	);
}