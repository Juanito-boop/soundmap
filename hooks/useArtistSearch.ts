// useArtistSearch.ts
import { useState, useCallback } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase, type Artist, type Genre } from "@/lib/supabase"
import { getCountryContinent } from "@/app/continents"

type Filters = {
	debut: string
	gender: string
	members: string
	country: string
	popularity: string
	debutMin?: string
	debutMax?: string
	popularityMin?: string
	popularityMax?: string
}

type MatchStatus = {
	debut: string
	gender: string
	members: string
	country: string
	popularity: string
}

export function useArtistSearch(initialGenre: Genre) {
	const [selectedGenre, setSelectedGenre] = useState<Genre>(initialGenre)
	const [filters, setFilters] = useState<Filters>({
		debut: "",
		gender: "",
		members: "",
		country: "",
		popularity: "",
	})

	const [matchStatus, setMatchStatus] = useState<MatchStatus>({
		debut: "none",
		gender: "none",
		members: "none",
		country: "none",
		popularity: "none",
	})

	const buildQuery = useCallback(
		(genre: Genre, filters: Filters, matchStatus: MatchStatus) => {
			let query = supabase
				.from(genre)
				.select("id, name, country, debut, gender, members, popularity, imageUrl")

			// Excluir registros con debut 0 (registros desconocidos)
			query = query.neq("debut", 0)
			
			// --- Filtro para "debut" ---
			if (filters.debutMin && filters.debutMax) {
				query = query
					.gte("debut", Number.parseInt(filters.debutMin))
					.lte("debut", Number.parseInt(filters.debutMax))
			} else if (filters.debut) {
				const debutYear = Number.parseInt(filters.debut)
				if (!isNaN(debutYear) && matchStatus.debut !== "none") {
					if (matchStatus.debut === "correct") {
						query = query.eq("debut", debutYear)
					} else if (matchStatus.debut === "lower") {
						// "lower" en UI significa "Before"
						query = query.lt("debut", debutYear)
					} else if (matchStatus.debut === "higher") {
						// "higher" en UI significa "After"
						query = query.gt("debut", debutYear)
					}
				}
			}

			// --- Filtro para "country" ---
			if (filters.country) {
				if (matchStatus.country === "correct") {
					query = query.eq("country", filters.country)
				} else if (matchStatus.country === "continent") {
					const continentCountries = getCountryContinent(filters.country)
					if (continentCountries.length > 0) {
						query = query.in("country", continentCountries)
					}
				}
			}

			// --- Filtro para "gender" ---
			if (filters.gender) {
				query = query.eq("gender", filters.gender)
			}

			// --- Filtro para "members" ---
			if (filters.members) {
				query = query.eq("members", filters.members)
			}

			// --- Filtro para "popularity" ---
			if (filters.popularityMin && filters.popularityMax) {
				query = query
					.gte("popularity", Number.parseInt(filters.popularityMin))
					.lte("popularity", Number.parseInt(filters.popularityMax))
			} else if (filters.popularity) {
				const popularityValue = Number.parseInt(filters.popularity)
				if (!isNaN(popularityValue) && matchStatus.popularity !== "none") {
					if (matchStatus.popularity === "correct") {
						query = query.eq("popularity", popularityValue)
					} else if (matchStatus.popularity === "lower") {
						query = query.lt("popularity", popularityValue)
					} else if (matchStatus.popularity === "higher") {
						query = query.gt("popularity", popularityValue)
					}
				}
			}

			return query
		},
		[]
	)

	const {
		data: artists,
		isLoading,
		refetch,
	} = useQuery<Artist[]>({
		queryKey: ["artists", selectedGenre, filters, matchStatus],
		queryFn: async () => {
			try {
				const query = buildQuery(selectedGenre, filters, matchStatus)
				const { data, error } = await query
				if (error) throw error

				// Si no hay datos, devolvemos un array vacío
				if (!data) return []

				return data.map((artist) => ({ ...artist, genre: selectedGenre }))
			} catch (error) {
				console.error("Error fetching artists:", error)
				return []
			}
		},
		// Ejecutamos la query si hay algún valor en los filtros y un género seleccionado
		enabled: !!selectedGenre && Object.values(filters).some((value) => value !== ""),
	})

	const clearSearch = useCallback(() => {
		setFilters({
			country: "",
			debut: "",
			gender: "",
			members: "",
			popularity: "",
			debutMin: "",
			debutMax: "",
			popularityMin: "",
			popularityMax: "",
		})
		setMatchStatus({
			country: "none",
			debut: "none",
			gender: "none",
			members: "none",
			popularity: "none",
		})
		refetch()
	}, [refetch])

	return {
		filters,
		setFilters,
		matchStatus,
		setMatchStatus,
		artists,
		isLoading,
		clearSearch,
		setSelectedGenre,
	}
}