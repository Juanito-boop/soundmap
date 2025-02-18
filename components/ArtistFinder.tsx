import { useArtistSearch } from "@/hooks/useArtistSearch"
import { genres } from "@/lib/supabase"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useEffect } from "react"
import { FilterSection } from "./FilterSection"
import { ResultsSection } from "./ResultsSection"

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
			<div className="min-h-screen bg-background-light dark:bg-background-dark discord:bg-background-discord text-foreground-light dark:text-foreground-dark discord:text-foreground-dark p-8 mb-16 lg:mb-0 md:mb-0">
				<div className="max-w-4xl mx-auto">
					<div className="flex items-center justify-center mb-8 gap-x-2">
						<Avatar className="rounded-none w-10 h-10">
							<AvatarImage src="/image.svg" alt="soundmap" />
							<AvatarFallback>soundmap</AvatarFallback>
						</Avatar>
						<h1 className="flex flex-col gap-x-1.5 md:flex-row">
							<span className="text-3xl font-bold">SoundMap</span>
							<span className="text-3xl font-bold">Artist Finder</span>
						</h1>
					</div>
					<FilterSection
						filters={filters}
						setFilters={setFilters}
						matchStatus={matchStatus}
						setMatchStatus={setMatchStatus}
						selectedGenres={selectedGenres}
						setSelectedGenres={setSelectedGenres}
					/>
				</div>
				<ResultsSection artists={artists} isLoading={isLoading} />
			</div>
		</>
	)
}
