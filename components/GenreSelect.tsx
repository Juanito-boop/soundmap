import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Genre } from "@/lib/supabase"

type GenreSelectProps = {
	selectedGenres: Genre[]
	setSelectedGenres: (genres: Genre[]) => void
	genres: readonly Genre[]
}

export function GenreSelect({ selectedGenres, setSelectedGenres, genres }: GenreSelectProps) {
	const [isMultiSelect, setIsMultiSelect] = useState(false)

	const handleGenreChange = (genre: Genre) => {
		if (selectedGenres.includes(genre)) {
			setSelectedGenres(selectedGenres.filter((g) => g !== genre))
		} else {
			setSelectedGenres([...selectedGenres, genre])
		}
	}

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<Label htmlFor="genre-select">Genre</Label>
				<div className="flex items-center space-x-2">
					<Label htmlFor="multi-select-switch" className="text-sm">
						Multi-select
					</Label>
					<Switch 
						id="multi-select-switch" 
						className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600 [&>span]:bg-white" 
						checked={isMultiSelect} 
						onCheckedChange={setIsMultiSelect} 
					/>
				</div>
			</div>
			<Select
				value={isMultiSelect ? undefined : selectedGenres[0]}
				onValueChange={(value) => !isMultiSelect && setSelectedGenres([value as Genre])}
			>
				<SelectTrigger id="genre-select" className="bg-input  dark:bg-input-dark ">
					<SelectValue placeholder="Select genre" />
				</SelectTrigger>
				<SelectContent>
					<ScrollArea className="h-[200px] bg-input  dark:bg-input-dark ">
						{isMultiSelect
							? genres.map((genre) => (
								<div key={genre} className="flex items-center space-x-2 p-2">
									<Checkbox
										id={genre}
										checked={selectedGenres.includes(genre)}
										onCheckedChange={() => handleGenreChange(genre)}
									/>
									<Label htmlFor={genre}>{genre}</Label>
								</div>
							))
							: genres.map((genre) => (
								<SelectItem key={genre} value={genre}>
									{genre}
								</SelectItem>
							))}
					</ScrollArea>
				</SelectContent>
			</Select>
		</div>
	)
}

