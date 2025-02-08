"use client"
import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import type { Artist } from "@/lib/supabase"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ControlButtons } from "./ControlButtons"

type ResultsSectionProps = {
	artists: Artist[] | undefined
	isLoading: boolean
}

export function ResultsSection({ artists, isLoading }: ResultsSectionProps) {
	const [columnCount, setColumnCount] = useState<1 | 2>(2);
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	const [sortField, setSortField] = useState<"popularity" | "debut">("popularity");

	const sortedArtists = useMemo(() => {
		if (!artists) return [];
		return [...artists].sort((a, b) => {
			if (sortField === "popularity") {
				return sortOrder === "asc"
					? a.popularity - b.popularity
					: b.popularity - a.popularity;
			} else if (sortField === "debut") {
				const debutA =
					typeof a.debut === "number" ? a.debut : parseInt(a.debut as string, 10) || 0;
				const debutB =
					typeof b.debut === "number" ? b.debut : parseInt(b.debut as string, 10) || 0;
				return sortOrder === "asc" ? debutA - debutB : debutB - debutA;
			}
			return 0;
		});
	}, [artists, sortField, sortOrder]);

	return (
		<div className="mt-4">
			<ControlButtons
				sortOrder={sortOrder}
				onSortOrderChange={setSortOrder}
				sortField={sortField}
				onSortFieldChange={setSortField}
				columnCount={columnCount}
				onColumnCountChange={setColumnCount}
			/>

			{isLoading ? (
				<p className="text-center text-muted-foreground">Loading artists...</p>
			) : sortedArtists && sortedArtists.length > 0 ? (
				<div
					className={`grid gap-4 ${columnCount === 1
							? "grid-cols-1"
							: columnCount === 2
								? "grid-cols-1 md:grid-cols-2"
								: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
						}`}
				>
						{columnCount === 2 ? (
							sortedArtists.map((artist) => (
								<Card
									key={artist.id}
									className="p-4 bg-card text-card-foreground min-h-fit grid grid-cols-3 grid-rows-3 gap-y-4"
								>
									<div className="col-span-3 flex flex-row justify-start gap-x-4 mx-5 my-auto">
										<Avatar className="w-14 h-14 my-auto">
											<AvatarImage
												src={artist.imageUrl}
												className="rounded-full"
												alt={`${artist.name} photo`}
												loading="lazy"
											/>
											<AvatarFallback>{artist.name}</AvatarFallback>
										</Avatar>
										<h3 className="font-bold text-lg my-auto">{artist.name}</h3>
									</div>
									<div className="grid grid-cols-3 col-span-3 row-span-2 gap-2 [&>div]:bg-input dark:[&>div]:bg-input-dark [&>div]:text-lg">
										<div className="row-start-1 flex flex-col rounded-sm p-1 align-middle">
											<span className="mx-auto">Debut</span>
											<span className="mx-auto">{artist.debut}</span>
										</div>
										<div className="row-start-1 flex flex-col rounded-sm p-1">
											<span className="mx-auto">Popularity</span>
											<span className="mx-auto">#{artist.popularity}</span>
										</div>
										<div className="row-start-1 flex flex-col rounded-sm p-1">
											<span className="mx-auto">Members</span>
											<span className="mx-auto">{artist.members}</span>
										</div>
										<div className="row-start-2 col-start-1 flex flex-col rounded-sm p-1">
											<span className="mx-auto">Genre</span>
											<span className="mx-auto">{artist.genre}</span>
										</div>
										<div className="row-start-2 col-start-2 flex flex-col rounded-sm p-1">
											<span className="mx-auto">Country</span>
											<span className="mx-auto">{artist.country}</span>
										</div>
										<div className="row-start-2 col-start-3 flex flex-col rounded-sm p-1">
											<span className="mx-auto">Gender</span>
											<span className="mx-auto">{artist.gender}</span>
										</div>
									</div>
								</Card>
							))
						) : (
							sortedArtists.map((artist) => (
								<Card
									key={artist.id}
									className="p-4 bg-card text-card-foreground grid grid-cols-4 grid-rows-2 gap-4"
								>
									<div className="flex flex-col justify-center gap-x-4 mx-5 my-auto row-span-2 gap-y-2">
										<Avatar className="w-16 h-16 my-auto mx-auto">
											<AvatarImage
												src={artist.imageUrl}
												className="rounded-full"
												alt={`${artist.name} photo`}
												loading="lazy"
											/>
											<AvatarFallback>{artist.name}</AvatarFallback>
										</Avatar>
										<h3 className="font-bold text-lg my-auto mx-auto">{artist.name}</h3>
									</div>
									<div className="grid grid-cols-3 col-span-3 row-span-2 gap-2 [&>div]:bg-input dark:[&>div]:bg-input-dark [&>div]:text-lg">
										<div className="row-start-1 flex flex-col rounded-sm p-1">
											<span className="mx-auto">Debut</span>
											<span className="mx-auto">{artist.debut}</span>
										</div>
										<div className="row-start-1 flex flex-col rounded-sm p-1">
											<span className="mx-auto">Popularity</span>
											<span className="mx-auto">#{artist.popularity}</span>
										</div>
										<div className="row-start-1 flex flex-col rounded-sm p-1">
											<span className="mx-auto">Members</span>
											<span className="mx-auto">{artist.members}</span>
										</div>
										<div className="row-start-2 col-start-1 flex flex-col rounded-sm p-1">
											<span className="mx-auto">Genre</span>
											<span className="mx-auto">{artist.genre}</span>
										</div>
										<div className="row-start-2 col-start-2 flex flex-col rounded-sm p-1">
											<span className="mx-auto">Country</span>
											<span className="mx-auto">{artist.country}</span>
										</div>
										<div className="row-start-2 col-start-3 flex flex-col rounded-sm p-1">
											<span className="mx-auto">Gender</span>
											<span className="mx-auto">{artist.gender}</span>
										</div>
									</div>
								</Card>
							))
						)}
				</div>
			) : artists?.length === 0 ? (
				<p className="text-center text-muted-foreground">No artists found matching your criteria</p>
			) : (
				<p className="text-center text-muted-foreground">
					Enter the information from your game to find possible artists
				</p>
			)}
		</div>
	)
}

