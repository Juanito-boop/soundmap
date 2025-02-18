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
	const [columnCount, setColumnCount] = useState<1 | 2 | 3>(2);
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
		<div className="mt-4 ">
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
					className={`grid gap-4 mb-15 ${
						columnCount === 1
							? "grid-cols-1"
							: columnCount === 2
								? "md:grid-cols-2 lg:max-w-4xl lg:mx-auto"
								: "md:grid-cols-2 lg:grid-cols-3"
					}`}
				>
					{columnCount === 2 ? (
						sortedArtists.map((artist) => (
							<Card
								key={artist.id}
								className="grid grid-cols-3 grid-rows-3 p-4 bg-card text-card-foreground min-h-fit gap-y-4"
							>
								<div className="flex flex-row justify-start col-span-3 mx-5 my-auto gap-x-4">
									<Avatar className="my-auto w-14 h-14">
										<AvatarImage
											src={artist.imageUrl}
											className="rounded-full"
											alt={`${artist.name} photo`}
											loading="lazy"
										/>
										<AvatarFallback>{artist.name}</AvatarFallback>
									</Avatar>
									<h3 className="my-auto text-lg font-bold">{artist.name}</h3>
								</div>
								<div className="grid grid-cols-3 col-span-3 row-span-2 gap-2 [&>div]:bg-input-light dark:[&>div]:bg-input-dark discord:[&>div]:bg-input-discord [&>div]:text-lg">
									<div className="flex flex-col row-start-1 p-1 align-middle rounded-sm">
										<span className="mx-auto">Debut</span>
										<span className="mx-auto">{artist.debut}</span>
									</div>
									<div className="flex flex-col row-start-1 p-1 rounded-sm">
										<span className="mx-auto">Popularity</span>
										<span className="mx-auto">#{artist.popularity}</span>
									</div>
									<div className="flex flex-col row-start-1 p-1 rounded-sm">
										<span className="mx-auto">Members</span>
										<span className="mx-auto">{artist.members}</span>
									</div>
									<div className="flex flex-col col-start-1 row-start-2 p-1 rounded-sm">
										<span className="mx-auto">Genre</span>
										<span className="mx-auto">{artist.genre}</span>
									</div>
									<div className="flex flex-col col-start-2 row-start-2 p-1 rounded-sm">
										<span className="mx-auto">Country</span>
										<span className="mx-auto">{artist.country}</span>
									</div>
									<div className="flex flex-col col-start-3 row-start-2 p-1 rounded-sm">
										<span className="mx-auto">Gender</span>
										<span className="mx-auto">{artist.gender}</span>
									</div>
								</div>
							</Card>
						))
					) : columnCount === 3 ? (
						sortedArtists.map((artist) => (
							<Card
								key={artist.id}
								className="grid grid-cols-3 grid-rows-3 p-4 bg-card text-card-foreground min-h-fit gap-y-4"
							>
								<div className="flex flex-row justify-start col-span-3 mx-5 my-auto gap-x-4">
									<Avatar className="my-auto w-14 h-14">
										<AvatarImage
											src={artist.imageUrl}
											className="rounded-full"
											alt={`${artist.name} photo`}
											loading="lazy"
										/>
										<AvatarFallback>{artist.name}</AvatarFallback>
									</Avatar>
									<h3 className="my-auto text-lg font-bold">{artist.name}</h3>
								</div>
								<div className="grid grid-cols-3 col-span-3 row-span-2 gap-2 [&>div]:bg-input-light dark:[&>div]:bg-input-dark discord:[&>div]:bg-input-discord [&>div]:text-lg">
									<div className="flex flex-col row-start-1 p-1 align-middle rounded-sm">
										<span className="mx-auto">Debut</span>
										<span className="mx-auto">{artist.debut}</span>
									</div>
									<div className="flex flex-col row-start-1 p-1 rounded-sm">
										<span className="mx-auto">Popularity</span>
										<span className="mx-auto">#{artist.popularity}</span>
									</div>
									<div className="flex flex-col row-start-1 p-1 rounded-sm">
										<span className="mx-auto">Members</span>
										<span className="mx-auto">{artist.members}</span>
									</div>
									<div className="flex flex-col col-start-1 row-start-2 p-1 rounded-sm">
										<span className="mx-auto">Genre</span>
										<span className="mx-auto">{artist.genre}</span>
									</div>
									<div className="flex flex-col col-start-2 row-start-2 p-1 rounded-sm">
										<span className="mx-auto">Country</span>
										<span className="mx-auto">{artist.country}</span>
									</div>
									<div className="flex flex-col col-start-3 row-start-2 p-1 rounded-sm">
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
								className="grid grid-cols-4 grid-rows-2 gap-4 p-4 bg-card text-card-foreground lg:min-w-4xl lg:max-w-4xl lg:mx-auto"
							>
								<div className="flex flex-col justify-center row-span-2 mx-5 my-auto gap-x-4 gap-y-2">
									<Avatar className="size-16 m-auto">
										<AvatarImage
											src={artist.imageUrl}
											className="rounded-full"
											alt={`${artist.name} photo`}
											loading="lazy"
										/>
										<AvatarFallback>{artist.name}</AvatarFallback>
									</Avatar>
									<h3 className="mx-auto my-auto text-lg font-bold">{artist.name}</h3>
								</div>
								<div className="grid grid-cols-3 col-span-3 row-span-2 gap-2 [&>div]:bg-input-light dark:[&>div]:bg-input-dark discord:[&>div]:bg-input-discord [&>div]:text-lg">
									<div className="flex flex-col row-start-1 p-1 rounded-sm">
										<span className="mx-auto">Debut</span>
										<span className="mx-auto">{artist.debut}</span>
									</div>
									<div className="flex flex-col row-start-1 p-1 rounded-sm">
										<span className="mx-auto">Popularity</span>
										<span className="mx-auto">#{artist.popularity}</span>
									</div>
									<div className="flex flex-col row-start-1 p-1 rounded-sm">
										<span className="mx-auto">Members</span>
										<span className="mx-auto">{artist.members}</span>
									</div>
									<div className="flex flex-col col-start-1 row-start-2 p-1 rounded-sm">
										<span className="mx-auto">Genre</span>
										<span className="mx-auto">{artist.genre}</span>
									</div>
									<div className="flex flex-col col-start-2 row-start-2 p-1 rounded-sm">
										<span className="mx-auto">Country</span>
										<span className="mx-auto">{artist.country}</span>
									</div>
									<div className="flex flex-col col-start-3 row-start-2 p-1 rounded-sm">
										<span className="mx-auto">Gender</span>
										<span className="mx-auto">{artist.gender}</span>
									</div>
								</div>
							</Card>
						))
					)}
				</div>
			) : artists?.length === 0 ? (
				<p className="mb-20 text-center text-muted-foreground-light dark:text-muted-foreground-dark md:mb-0">No artists found matching your criteria</p>
			) : (
				<p className="mb-20 text-center text-muted-foreground-light dark:text-muted-foreground-dark md:mb-0">Enter the information from your game to find possible artists</p>
			)}
		</div>
	)
}

