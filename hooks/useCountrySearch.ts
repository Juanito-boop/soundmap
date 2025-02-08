import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useCountrySearch() {
	// Término de búsqueda ingresado por el usuario.
	const [countrySearchTerm, setCountrySearchTerm] = useState("");

	// Obtenemos la lista de países distintos desde Supabase.
	const { data: distinctCountries } = useQuery({
		queryKey: ["countries"],
		queryFn: async () => {
			const { data, error } = await supabase.rpc("get_distinct_countries");
			if (error) throw error;
			// Filtramos los registros que tengan un valor válido.
			return (data as { country: string }[]).filter(
				(item) => item.country && item.country.trim() !== ""
			);
		},
	});

	// Implementamos un debounce para el término de búsqueda.
	const [debouncedTerm, setDebouncedTerm] = useState(countrySearchTerm);
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedTerm(countrySearchTerm);
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [countrySearchTerm]);

	// Calculamos la lista de países filtrada en función del término debounced.
	const filteredCountries = useMemo(() => {
		if (!distinctCountries) return [];
		const term = debouncedTerm.toLowerCase().trim();
		if (!term) return distinctCountries;
		return distinctCountries.filter((item) =>
			item.country.toLowerCase().includes(term)
		);
	}, [distinctCountries, debouncedTerm]);

	// Reiniciamos el término de búsqueda al hacer clic fuera.
	useEffect(() => {
		const handleClickOutside = () => {
			setCountrySearchTerm("");
		};
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return {
		// Devolvemos la lista filtrada en lugar de la lista original.
		distinctCountries: filteredCountries,
		countrySearchTerm,
		setCountrySearchTerm,
	};
}
