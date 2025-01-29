import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"

export function useCountrySearch() {
  const [countrySearchTerm, setCountrySearchTerm] = useState("")

  const { data: distinctCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_distinct_countries")
      if (error) throw error
      return (data as { country: string }[]).filter((item) => item.country && item.country.trim() !== "")
    },
  })

  useEffect(() => {
    const handleClickOutside = () => {
      setCountrySearchTerm("")
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return { distinctCountries, countrySearchTerm, setCountrySearchTerm }
}

