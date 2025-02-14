import { useState, useEffect } from "react"
import type { Genre } from "@/lib/supabase"
import { useArtistSearch } from "@/hooks/useArtistSearch"
import { FilterSection } from "./FilterSection"
import { ResultsSection } from "./ResultsSection"
import { ClearSearchButton } from "./ClearSearchButton"
import { genres } from "@/lib/supabase"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"

export function ArtistFinder() {
	const {
		filters,
		setFilters,
		matchStatus,
		setMatchStatus,
		artists,
		isLoading,
		clearSearch,
		selectedGenres,
		setSelectedGenres,
	} = useArtistSearch([genres[0]])

	const handleClearSearch = () => {
		clearSearch()
		setSelectedGenres([genres[0]])
	}

	useEffect(() => {
		(window as any).clearArtistSearch = handleClearSearch
		return () => {
			delete (window as any).clearArtistSearch
		}
	}, [handleClearSearch])

	return (
		<>
			<div className="min-h-screen bg-background text-foreground p-8 mb-16 lg:mb-0 md:mb-0">
				<div className="max-w-4xl mx-auto">
					<div className="flex items-center justify-center mb-8 gap-x-2">
						<Avatar className="rounded-none w-10 h-10">
							<AvatarImage src="/image.svg" alt="soundmap" />
							<AvatarFallback>soundmap</AvatarFallback>
						</Avatar>
						<h1 className="text-3xl font-bold">SoundMap Artist Finder</h1>
					</div>
					<FilterSection
						filters={filters}
						setFilters={setFilters}
						matchStatus={matchStatus}
						setMatchStatus={setMatchStatus}
						selectedGenres={selectedGenres}
						setSelectedGenres={setSelectedGenres}
					/>
					<ResultsSection artists={artists} isLoading={isLoading} />
				</div>
			</div>
		</>
	)
}
