import type { Dispatch, SetStateAction } from "react";
import { Card } from "@/components/ui/card";
import { genres, type Genre } from "@/lib/supabase";
import { FilterField } from "./FilterField";
import { GenreSelect } from "./GenreSelect";

type FilterValues = {
	debut: string;
	gender: string;
	members: string;
	country: string;
	popularity: string;
};

type FilterSectionProps = {
	filters: FilterValues;
	setFilters: Dispatch<SetStateAction<FilterValues>>;
	matchStatus: FilterValues;
	setMatchStatus: Dispatch<SetStateAction<FilterValues>>;
	selectedGenres: Genre[];
	setSelectedGenres: (genres: Genre[]) => void;
};

const firstGroupFields: (keyof FilterValues)[] = ["debut", "popularity", "members"];
const secondGroupFields: (keyof FilterValues)[] = ["country", "gender"];

export function FilterSection({
	filters,
	setFilters,
	matchStatus,
	setMatchStatus,
	selectedGenres,
	setSelectedGenres,
}: FilterSectionProps) {
	return (
		<div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-3">
			{firstGroupFields.map((field) => (
				<FilterField
					key={field}
					field={field}
					filters={filters}
					setFilters={setFilters}
					matchStatus={matchStatus}
					setMatchStatus={setMatchStatus}
				/>
			))}
			<Card className="p-4 bg-card-light dark:bg-card-dark discord:bg-card-discord">
				<GenreSelect
					selectedGenres={selectedGenres}
					setSelectedGenres={setSelectedGenres}
					genres={genres}
				/>
			</Card>
			{secondGroupFields.map((field) => (
				<FilterField
					key={field}
					field={field}
					filters={filters}
					setFilters={setFilters}
					matchStatus={matchStatus}
					setMatchStatus={setMatchStatus}
				/>
			))}
		</div>
	);
}
