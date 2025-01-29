import { Card } from "@/components/ui/card"
import type { Artist } from "@/lib/supabase"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useEffect, useState } from "react"
import axios from "axios"
import { sleep } from "@/lib/utils"

type ResultsSectionProps = {
  artists: Artist[] | undefined
  isLoading: boolean
}

export function ResultsSection({ artists, isLoading }: ResultsSectionProps) {
	const [artistImages, setArtistImages] = useState<{ [key: string]: string }>({})
	const [imagesLoaded, setImagesLoaded] = useState(false)

	useEffect(() => {
		const fetchAccessToken = async () => {
			try {
				const encodedParams = new URLSearchParams();
				encodedParams.set("grant_type", "client_credentials");
				encodedParams.set("client_id", "267055690608474eb8187d56a30962c0");
				encodedParams.set("client_secret", "f48c78209034475d8a8c28afebd1222a");

				const options = {
					method: "POST",
					url: "https://accounts.spotify.com/api/token",
					headers: { "content-type": "application/x-www-form-urlencoded" },
					data: encodedParams,
				};

				const { data } = await axios.request(options);
				return data.access_token;
			} catch (error) {
				console.error("Error fetching access token:", error);
				return null;
			}
		};

		const fetchImages = async (token: string) => {
			if (!artists) {
				return;
			}
			const newImages: { [key: string]: string } = {};
			for (const artist of artists) {
				try {
					const response = await axios.get(
						`https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(artist.name)}&decorate_restrictions=false&best_match=true&include_external=audio&limit=1`,
						{ headers: { Authorization: `Bearer ${token}` } }
					);
					newImages[artist.id] = response.data.best_match.items[0].images[0].url;
					await sleep(200);
				} catch (error) {
					console.error("Error fetching image:", error);
					if (axios.isAxiosError(error) && error.response?.status === 429) {
						const retryAfter = Number.parseInt(error.response.headers["retry-after"] || "5", 10);
						console.log(`Rate limited. Waiting for ${retryAfter} seconds before retrying.`);
						await sleep(retryAfter * 1000);
						try {
							const retryResponse = await axios.get(
								`https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(artist.name)}&decorate_restrictions=false&best_match=true&include_external=audio&limit=1`,
								{ headers: { Authorization: `Bearer ${token}` } }
							);
							newImages[artist.id] = retryResponse.data.best_match.items[0].images[0].url;
						} catch (retryError) {
							console.error("Error retrying image fetch:", retryError);
							newImages[artist.id] = `https://via.placeholder.com/300x300.png?text=${encodeURIComponent(artist.name)}`;
						}
					} else {
						newImages[artist.id] = `https://via.placeholder.com/300x300.png?text=${encodeURIComponent(artist.name)}`;
					}
				}
			}
			setArtistImages(newImages);
			setImagesLoaded(true);
		};

		const initialize = async () => {
			let token = await fetchAccessToken();
			if (token) {
				try {
					await fetchImages(token);
				} catch (error) {
					if (axios.isAxiosError(error) && error.response?.status === 401) {
						token = await fetchAccessToken();
						if (token) {
							await fetchImages(token);
						}
					} else {
						console.error("Error initializing:", error);
					}
				}
			}
		};

		if (artists) {
			setImagesLoaded(false);
			initialize();
		}
	}, [artists]);

	return (
		<div className="mt-8">
			{isLoading || (artists && artists.length > 0 && !imagesLoaded) ? (
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
									<AvatarImage src={artistImages[artist.id]} className="rounded-full" alt="soundmap" loading="lazy" />
									<AvatarFallback>soundmap</AvatarFallback>
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