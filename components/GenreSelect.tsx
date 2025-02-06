"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

type Genre = "HIP HOP" | "INDIE" | "POP" | "R&B" | "ROCK"

type GenreSelectProps = {
	selectedGenres: Genre[]
	setSelectedGenres: (genres: Genre[]) => void
	genres: readonly Genre[]
}

export function GenreSelect({ selectedGenres, setSelectedGenres, genres }: GenreSelectProps) {
	const [isMultiSelect, setIsMultiSelect] = useState(false)

	const handleGenreChange = (genre: Genre) => {
		if (isMultiSelect) {
			const updatedGenres = selectedGenres.includes(genre)
				? selectedGenres.filter((g) => g !== genre)
				: [...selectedGenres, genre]
			setSelectedGenres(updatedGenres)
		} else {
			setSelectedGenres([genre])
		}
	}

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between mb-2">
				<Label htmlFor="genre-select">Genre</Label>
				<div className="flex items-center space-x-2">
					<Label htmlFor="multi-select-switch" className="text-sm">
						Multi-select
					</Label>
					<Switch id="multi-select-switch" checked={isMultiSelect} onCheckedChange={setIsMultiSelect} className="bg-gray-600 data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600 [&>span]:bg-white" />
				</div>
			</div>
			<Select
				value={selectedGenres.length > 0 ? selectedGenres[0] : undefined}
				onValueChange={(value) => handleGenreChange(value as Genre)}
			>
				<SelectTrigger
					id="genre-select"
					className="w-full bg-input text-input-foreground dark:bg-input-dark dark:text-input-foreground-dark"
				>
					<SelectValue placeholder="Select genre(s)">
						{selectedGenres.length > 0
							? isMultiSelect
								? selectedGenres.join(", ")
								: selectedGenres[0]
							: "Select genre(s)"}
					</SelectValue>
				</SelectTrigger>
				<SelectContent className="bg-input dark:bg-input-dark">
					{genres.map((genre) => (
						<SelectItem key={genre} value={genre} className="p-0">
							<div
								className="flex items-center space-x-2 px-2 py-1.5 w-full cursor-pointer"
								onClick={() => handleGenreChange(genre)}
							>
								{isMultiSelect ? (
									<Checkbox
										id={`checkbox-${genre}`}
										checked={selectedGenres.includes(genre)}
										onCheckedChange={() => handleGenreChange(genre)}
										className="mr-2"
									/>
								) : (
									<div className="w-4 h-4 mr-2" />
								)}
								<Label htmlFor={`checkbox-${genre}`} className="flex-grow">
									{genre}
								</Label>
							</div>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}