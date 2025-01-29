import { arrayOfContients } from "@/app/continents";

export const getCountryContinent = (countryName: string, continents: any) => {
	for (const [continent, countries] of Object.entries(continents)) {
		if (arrayOfContients.some((c: any) => c.common === countryName)) {
			return continent;
		}
	}
	return null;
};