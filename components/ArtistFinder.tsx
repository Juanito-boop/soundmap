import { useEffect, useState } from "react"
import type { Genre } from "@/lib/supabase"
import { useArtistSearch } from "@/hooks/useArtistSearch"
import { FilterSection } from "./FilterSection"
import { ResultsSection } from "./ResultsSection"
import { ClearSearchButton } from "./ClearSearchButton"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ArtistFinder() {
	const [selectedGenre, setSelectedGenre] = useState<Genre>("POP")
	const {
		filters,
		setFilters,
		matchStatus,
		setMatchStatus,
		artists,
		isLoading,
		clearSearch,
		setSelectedGenre: setSearchGenre,
	} = useArtistSearch(selectedGenre)

	useEffect(() => {
		setSearchGenre(selectedGenre)
	}, [selectedGenre, setSearchGenre])

	const handleGenreChange = (genre: Genre) => {
		setSelectedGenre(genre)
		clearSearch()
	}

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8 gap-x-2">
					<Avatar className="rounded-none">
						<AvatarImage src="/image.svg" alt="soundmap" />
						<AvatarFallback>soundmap</AvatarFallback>
					</Avatar>
          <h1 className="text-3xl font-bold">SoundMap Artist Finder</h1>
        </div>
				<ScrollArea>
					<FilterSection
						filters={filters}
						setFilters={setFilters}
						matchStatus={matchStatus}
						setMatchStatus={setMatchStatus}
						selectedGenre={selectedGenre}
						setSelectedGenre={handleGenreChange}
					/>
					<ResultsSection artists={artists} isLoading={isLoading} />
				</ScrollArea>
				<ClearSearchButton onClear={clearSearch} />
      </div>
    </div>
  )
}

