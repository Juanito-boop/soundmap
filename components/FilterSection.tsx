import type { Dispatch, SetStateAction } from "react"
import { Card } from "@/components/ui/card"
import { genres, type Genre } from "@/lib/supabase"
import { FilterField } from "./FilterField"
import { GenreSelect } from "./GenreSelect"

type FilterSectionProps = {
  filters: {
    debut: string
    gender: string
    members: string
    country: string
    popularity: string
  }
  setFilters: Dispatch<
    SetStateAction<{
      debut: string
      gender: string
      members: string
      country: string
      popularity: string
    }>
  >
  matchStatus: {
    debut: string
    gender: string
    members: string
    country: string
    popularity: string
  }
  setMatchStatus: Dispatch<
    SetStateAction<{
      debut: string
      gender: string
      members: string
      country: string
      popularity: string
    }>
  >
  selectedGenre: Genre
  setSelectedGenre: (genre: Genre) => void
}

export function FilterSection({
  filters,
  setFilters,
  matchStatus,
  setMatchStatus,
  selectedGenre,
  setSelectedGenre,
}: FilterSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {(["debut", "popularity", "members"] as const).map((field) => (
        <FilterField
          key={field}
          field={field}
          filters={filters}
          setFilters={setFilters}
          matchStatus={matchStatus}
          setMatchStatus={setMatchStatus}
        />
      ))}
      <Card className="p-4 bg-card text-card-foreground">
        <GenreSelect selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} genres={genres} />
      </Card>
      {(["country", "gender"] as const).map((field) => (
        <FilterField
          key={field}
          field={field}
          filters={filters}
          setFilters={setFilters}
          matchStatus={matchStatus}
          setMatchStatus={setMatchStatus}
        />
      ))}
    </div>
  )
}

