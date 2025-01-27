"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { genres, supabase, type Artist, type Genre } from "@/lib/supabase"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { CheckIcon, CircleIcon, Music2Icon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import findCode from "./continents"

type MatchStatus = "none" | "correct" | "higher" | "lower" | "continent"

const getCountryContinent = (countryCode: string) => {
	return findCode(countryCode)
}

function Home() {
	const [filters, setFilters] = useState({
		debut: "",
		gender: "",
		members: "",
		country: "",
		popularity: "",
	})
	const [matchStatus, setMatchStatus] = useState({
		debut: "none" as MatchStatus,
		gender: "none" as MatchStatus,
		members: "none" as MatchStatus,
		country: "none" as MatchStatus,
		popularity: "none" as MatchStatus,
	})
	const [selectedGenre, setSelectedGenre] = useState<Genre>("POP")
	const [countrySearchTerm, setCountrySearchTerm] = useState("")
	const [debutRange, setDebutRange] = useState([1900, new Date().getFullYear()])
	const [popularityRange, setPopularityRange] = useState([0, 100])
	const [useDebutRange, setUseDebutRange] = useState(false)
	const [usePopularityRange, setUsePopularityRange] = useState(false)

	useEffect(() => {
		const handleClickOutside = () => setCountrySearchTerm("")
		document.addEventListener("click", handleClickOutside)
		return () => document.removeEventListener("click", handleClickOutside)
	}, [])

	const { data: distinctCountries } = useQuery({
		queryKey: ["countries"],
		queryFn: async () => {
			const { data, error } = await supabase.rpc("get_distinct_countries")
			if (error) throw error
			return (data as { country: string }[]).filter((item) => item.country && item.country.trim() !== "")
		},
	})

	const {
		data: artists,
		isLoading,
		error,
	} = useQuery<Artist[] | null>({
		queryKey: ["artists", selectedGenre, filters, matchStatus],
		queryFn: async () => {
			const isAnyFilterConfirmed = Object.values(matchStatus).some((status) => status !== "none")

			if (!isAnyFilterConfirmed) {
				return null
			}

			try {
				let query = supabase.from(selectedGenre).select("id, name, country, debut, gender, members, popularity")

				if (filters.debut) {
					if (useDebutRange) {
						query = query.gte("debut", debutRange[0]).lte("debut", debutRange[1])
					} else {
						query = query.eq("debut", Number.parseInt(filters.debut))
					}
				}

				if (filters.gender && matchStatus.gender === "correct") {
					query = query.eq("gender", filters.gender)
				}

				if (filters.members && matchStatus.members === "correct") {
					query = query.eq("members", filters.members)
				}

				if (filters.country) {
					if (matchStatus.country === "correct") {
						query = query.eq("country", filters.country)
					} else if (matchStatus.country === "continent") {
						const countriesInContinent = getCountryContinent(filters.country)
						if (countriesInContinent) {
							query = query.in("country", countriesInContinent)
						}
					}
				}

				if (filters.popularity) {
					if (usePopularityRange) {
						query = query.gte("popularity", popularityRange[0]).lte("popularity", popularityRange[1])
					} else {
						query = query.eq("popularity", Number.parseInt(filters.popularity))
					}
				}

				const { data, error } = await query

				if (error) {
					console.error("Supabase query error:", error)
					throw new Error(`Supabase query failed: ${error.message}`)
				}

				return data
			} catch (error) {
				console.error("Error fetching artists:", error)
				throw error
			}
		},
		enabled: Object.values(matchStatus).some((status) => status !== "none"),
	})

	const getInputStyle = (field: keyof typeof matchStatus) => {
		switch (matchStatus[field]) {
			case "correct":
				return "bg-green-900 border-green-500 text-white"
			case "higher":
			case "lower":
				return "bg-yellow-900 border-yellow-500 text-white"
			case "continent":
				return "bg-yellow-900 border-yellow-500 text-white"
			default:
				return "bg-gray-700 border-gray-600 text-white"
		}
	}

	const setStatus = (field: keyof typeof matchStatus, status: MatchStatus) => {
		setMatchStatus((prev) => ({
			...prev,
			[field]: prev[field] === status ? "none" : status,
		}))
	}

	const renderStatusButtons = (field: keyof typeof filters) => {
		if (field === "country") {
			return (
				<div className="flex space-x-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus(field, "correct")}
						className={`flex-1 h-8 ${matchStatus[field] === "correct" ? "bg-green-600 hover:bg-green-700" : "hover:bg-gray-700"}`}
					>
						<CheckIcon className="w-4 h-4 text-white" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus(field, "continent")}
						className={`flex-1 h-8 ${matchStatus[field] === "continent" ? "bg-yellow-600 hover:bg-yellow-700" : "hover:bg-gray-700"}`}
					>
						<CircleIcon className="w-4 h-4 text-white" />
					</Button>
				</div>
			)
		}

		if (field === "gender" || field === "members") {
			return (
				<div className="flex space-x-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus(field, "correct")}
						className={`flex-1 h-8 ${matchStatus[field] === "correct" ? "bg-green-600 hover:bg-green-700" : "hover:bg-gray-700"}`}
					>
						<CheckIcon className="w-4 h-4 text-white" />
					</Button>
				</div>
			)
		}

		if (field === "debut" && !useDebutRange) {
			return (
				<div className="flex space-x-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus(field, "correct")}
						className={`flex-1 h-8 ${matchStatus[field] === "correct" ? "bg-green-600 hover:bg-green-700" : "hover:bg-gray-700"}`}
					>
						<CheckIcon className="w-4 h-4 text-white" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus(field, "lower")}
						className={`flex-1 h-8 text-white hover:text-white ${matchStatus[field] === "lower" ? "bg-yellow-600 hover:bg-yellow-700" : "hover:bg-gray-700"}`}
					>
						Before
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus(field, "higher")}
						className={`flex-1 h-8 text-white hover:text-white ${matchStatus[field] === "higher" ? "bg-yellow-600 hover:bg-yellow-700" : "hover:bg-gray-700"}`}
					>
						After
					</Button>
				</div>
			)
		}

		if (field === "popularity" && !usePopularityRange) {
			return (
				<div className="flex space-x-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus(field, "correct")}
						className={`flex-1 h-8 ${matchStatus[field] === "correct" ? "bg-green-600 hover:bg-green-700" : "hover:bg-gray-700"}`}
					>
						<CheckIcon className="w-4 h-4 text-white" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus(field, "lower")}
						className={`flex-1 h-8 text-white hover:text-white ${matchStatus[field] === "lower" ? "bg-yellow-600 hover:bg-yellow-700" : "hover:bg-gray-700"}`}
					>
						UP
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus(field, "higher")}
						className={`flex-1 h-8 text-white hover:text-white ${matchStatus[field] === "higher" ? "bg-yellow-600 hover:bg-yellow-700" : "hover:bg-gray-700"}`}
					>
						DOWN
					</Button>
				</div>
			)
		}

		return null
	}

	const renderField = (field: keyof typeof filters) => {
		type FieldType = "debut" | "popularity" | "country" | string

		const inputType = (field as FieldType) === "debut" || (field as FieldType) === "popularity" ? "number" : "text"

		const renderRangeField = (fieldName: "debut" | "popularity") => {
			const [range, setRange] =
				fieldName === "debut" ? [debutRange, setDebutRange] : [popularityRange, setPopularityRange]
			const [useRange, setUseRange] =
				fieldName === "debut" ? [useDebutRange, setUseDebutRange] : [usePopularityRange, setUsePopularityRange]

			return (
				<div>
					<div className="flex items-center space-x-2 mb-2">
						<Switch checked={useRange} onCheckedChange={setUseRange} id={`use-${fieldName}-range`} className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500" />
						<Label className="text-white" htmlFor={`use-${fieldName}-range`}>Use range</Label>
					</div>
					{useRange ? (
						<div className="flex space-x-2">
							<Input
								type="number"
								value={range[0] || ""}
								onChange={(e) => {
									const value =
										e.target.value === "" ? (fieldName === "debut" ? 1900 : 0) : Number.parseInt(e.target.value)
									setRange([value, range[1]])
									if (fieldName === "popularity" && popularityTimeoutRef.current)
										clearTimeout(popularityTimeoutRef.current)
									if (fieldName === "debut" && debutTimeoutRef.current) clearTimeout(debutTimeoutRef.current)
								}}
								className={getInputStyle(fieldName)}
								placeholder={`Min ${fieldName}`}
							/>
							<Input
								type="number"
								value={range[1] || ""}
								onChange={(e) => {
									const value =
										e.target.value === ""
											? fieldName === "debut"
												? new Date().getFullYear()
												: 100
											: Number.parseInt(e.target.value)
									setRange([range[0], value])
									if (fieldName === "popularity" && popularityTimeoutRef.current)
										clearTimeout(popularityTimeoutRef.current)
									if (fieldName === "debut" && debutTimeoutRef.current) clearTimeout(debutTimeoutRef.current)
								}}
								className={getInputStyle(fieldName)}
								placeholder={`Max ${fieldName}`}
							/>
						</div>
					) : (
						<Input
							type="number"
							value={filters[fieldName]}
							onChange={(e) => setFilters((prev) => ({ ...prev, [fieldName]: e.target.value }))}
							className={getInputStyle(fieldName)}
							placeholder={`Enter ${fieldName}`}
						/>
					)}
				</div>
			)
		}

		if (field === "country" && distinctCountries?.length) {
			return (
				<Select
					value={filters.country || undefined}
					onValueChange={(value) => setFilters((prev) => ({ ...prev, country: value }))}
				>
					<SelectTrigger className={getInputStyle("country")}>
						<SelectValue placeholder="Select country" />
					</SelectTrigger>
					<SelectContent>
						<div className="p-2">
							<Input
								type="text"
								placeholder="Search countries..."
								value={countrySearchTerm}
								onChange={(e) => setCountrySearchTerm(e.target.value)}
								className="mb-2"
							/>
						</div>
						{distinctCountries
							.filter((item) => item.country && item.country.toLowerCase().includes(countrySearchTerm.toLowerCase()))
							.map(
								(item) =>
									item.country && (
										<SelectItem key={item.country} value={item.country}>
											{item.country}
										</SelectItem>
									),
							)}
					</SelectContent>
				</Select>
			)
		}

		if (field === "debut" || field === "popularity") {
			return renderRangeField(field)
		}

		if (field === "gender") {
			return (
				<Select
					value={filters.gender || undefined}
					onValueChange={(value) => setFilters((prev) => ({ ...prev, gender: value }))}
				>
					<SelectTrigger className={getInputStyle("gender")}>
						<SelectValue placeholder="Select gender" />
					</SelectTrigger>
					<SelectContent>
						{['Female', 'Male', 'Mixed'].map((gender) => (
							<SelectItem key={gender} value={gender}>
								{gender}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)
		}

		if (field === "members") {
			return (
				<Select
					value={filters.members || undefined}
					onValueChange={(value) => setFilters((prev) => ({ ...prev, members: value }))}
				>
					<SelectTrigger className={getInputStyle("members")}>
						<SelectValue placeholder="Select type" />
					</SelectTrigger>
					<SelectContent>
						{["Solo", "Group"].map((type) => (
							<SelectItem key={type} value={type}>
								{type}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)
		}

		return (
			<Input
				type={inputType}
				value={filters[field]}
				onChange={(e) => setFilters((prev) => ({ ...prev, [field]: e.target.value }))}
				className={getInputStyle(field as keyof typeof matchStatus)}
				placeholder={`Enter ${field}`}
			/>
		)
	}

	const popularityTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const debutTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (usePopularityRange && (popularityRange[0] === 0 || popularityRange[1] === 100)) {
			popularityTimeoutRef.current = setTimeout(() => {
				if (popularityRange[0] === 0) setPopularityRange((prev) => [1, prev[1]])
				if (popularityRange[1] === 100) setPopularityRange((prev) => [prev[0], 205])
			}, 15000)
		}
		return () => {
			if (popularityTimeoutRef.current) clearTimeout(popularityTimeoutRef.current)
		}
	}, [usePopularityRange, popularityRange])

	useEffect(() => {
		if (useDebutRange && (debutRange[0] === 1900 || debutRange[1] === new Date().getFullYear())) {
			debutTimeoutRef.current = setTimeout(() => {
				if (debutRange[0] === 1900) setDebutRange((prev) => [1950, prev[1]])
				if (debutRange[1] === new Date().getFullYear()) setDebutRange((prev) => [prev[0], 2024])
			}, 15000)
		}
		return () => {
			if (debutTimeoutRef.current) clearTimeout(debutTimeoutRef.current)
		}
	}, [useDebutRange, debutRange])

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
			<div className="max-w-4xl mx-auto">
				<div className="flex items-center justify-center mb-8">
					<Music2Icon className="w-8 h-8 mr-2" />
					<h1 className="text-3xl font-bold">SoundMap Artist Finder</h1>
				</div>

				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
						<strong className="font-bold">Error:</strong>
						<span className="block sm:inline"> {error.toString()}</span>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
					{(["debut", "popularity", "members"] as const).map((field) => (
						<Card key={field} className="p-4 bg-gray-800 border-gray-700">
							<div className="flex flex-col space-y-2">
								<label className="text-sm font-medium text-white capitalize">{field}</label>
								{renderField(field)}
								{renderStatusButtons(field)}
							</div>
						</Card>
					))}
					<Card className="p-4 bg-gray-800 border-gray-700">
						<div className="flex flex-col space-y-2">
							<label className="text-sm font-medium text-white">Genre</label>
							<Select value={selectedGenre} onValueChange={(value) => setSelectedGenre(value as Genre)}>
								<SelectTrigger className={`bg-gray-700 border-gray-600 text-white`}>
									<SelectValue placeholder="Select genre" />
								</SelectTrigger>
								<SelectContent>
									{genres.map((genre) => (
										<SelectItem key={genre} value={genre}>
											{genre}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</Card>
					{(["country", "gender"] as const).map((field) => (
						<Card key={field} className="p-4 bg-gray-800 border-gray-700">
							<div className="flex flex-col space-y-2">
								<label className="text-sm font-medium text-white capitalize">{field}</label>
								{renderField(field)}
								{renderStatusButtons(field)}
							</div>
						</Card>
					))}
				</div>

				<div className="mt-8">
					{isLoading ? (
						<p className="text-center text-gray-400">Searching...</p>
					) : artists && artists.length > 0 ? (
						<div className="space-y-4">
							{artists.map((artist) => (
								<Card key={artist.name} className="p-4 bg-gray-800 border-gray-700">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<h3 className="font-bold text-lg text-gray-50">{artist.name}</h3>
											<p className="text-gray-400">Country: {artist.country}</p>
											<p className="text-gray-400">Debut: {artist.debut}</p>
										</div>
										<div>
											<p className="text-gray-400">Gender: {artist.gender}</p>
											<p className="text-gray-400">Members: {artist.members}</p>
											<p className="text-gray-400">Popularity: {artist.popularity}</p>
										</div>
									</div>
								</Card>
							))}
						</div>
					) : artists === null ? null : (
						<Card className="p-4 bg-gray-800 border-gray-700 text-center">
							<p className="text-gray-400 mb-2">No artists found matching your criteria.</p>
							<p className="text-gray-400">Try adjusting your filters or selecting a different genre.</p>
						</Card>
					)}
				</div>

				<div className="mt-8 text-center">
					<Button
						onClick={() => {
							setFilters({
								country: "",
								debut: "",
								gender: "",
								members: "",
								popularity: "",
							})
							setMatchStatus({
								country: "none",
								debut: "none",
								gender: "none",
								members: "none",
								popularity: "none",
							})
							setDebutRange([1900, new Date().getFullYear()])
							setPopularityRange([0, 100])
							setUseDebutRange(false)
							setUsePopularityRange(false)
						}}
						variant="outline"
						className="bg-gray-700 hover:bg-gray-600 text-white"
					>
						Clear Search
					</Button>
				</div>
			</div>
		</div>
	)
}

export default function Page() {
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<Home />
		</QueryClientProvider>
	)
}

