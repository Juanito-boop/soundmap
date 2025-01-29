import { Card } from "@/components/ui/card"
import type { Artist } from "@/lib/supabase"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import { sleep } from "@/lib/utils"

type ResultsSectionProps = {
  artists: Artist[] | undefined
  isLoading: boolean
}

export function ResultsSection({ artists, isLoading }: ResultsSectionProps) {
	return (
		<div className="mt-8">
			{isLoading ? (
				<p className="text-center text-muted-foreground">Loading artists...</p>
			) : artists && artists.length > 0 ? (
				<div className="grid gap-x-3 md:grid-cols-2 sm:grid-cols-1">
					{artists.map((artist) => (
						<Card
							key={artist.id}
							className="p-4 bg-card text-card-foreground min-h-fit grid grid-cols-3 grid-rows-3 mb-4 gap-y-2"
						>
							<div className="col-span-3 flex flex-row justify-start gap-x-4 mx-5 my-auto">
								<Avatar className="w-164 h-w-w-16 my-auto">
									{/* <AvatarImage src={artistImages[artist.id]} className="rounded-full" alt="soundmap" loading="lazy" /> */}
									{/* <AvatarFallback>soundmap</AvatarFallback> */}
								</Avatar>
								<h3 className="font-bold text-lg my-auto">{artist.name}</h3>
							</div>
							<div className="grid grid-cols-3 col-span-3 row-span-2 gap-2 [&>div]:bg-gray-700 [&>div]:text-lg">
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
					))}
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