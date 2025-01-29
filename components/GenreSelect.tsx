import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Genre } from "@/lib/supabase"

type GenreSelectProps = {
  selectedGenre: Genre
  setSelectedGenre: (genre: Genre) => void
  genres: readonly Genre[]
}

export function GenreSelect({ selectedGenre, setSelectedGenre, genres }: GenreSelectProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">Genre</label>
      <Select value={selectedGenre} onValueChange={(value) => setSelectedGenre(value as Genre)}>
				<SelectTrigger className="bg-gray-700">
          <SelectValue placeholder="Select genre" />
        </SelectTrigger>
				<SelectContent className="bg-gray-700">
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

