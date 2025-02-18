// ControlButtons.tsx
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Columns, Columns3 } from "lucide-react";

type ControlButtonsProps = {
	sortOrder: "asc" | "desc";
	onSortOrderChange: (order: "asc" | "desc") => void;
	sortField: "popularity" | "debut";
	onSortFieldChange: (field: "popularity" | "debut") => void;
	columnCount: 1 | 2 | 3;
	onColumnCountChange: (count: 1 | 2 | 3) => void;
};

export function ControlButtons({
  sortOrder,
  onSortOrderChange,
	sortField,
	onSortFieldChange,
  columnCount,
  onColumnCountChange,
}: ControlButtonsProps) {
  return (
		<div className="flex flex-col items-center mb-4 space-y-2 md:flex-row md:justify-between md:space-y-0">
			{/* Sección de ordenamiento */}
			<div className="flex flex-col items-start space-x-2 space-y-2 md:flex-row">
				<Select
					value={sortField}
					onValueChange={(value) =>
						onSortFieldChange(value as "popularity" | "debut")
					}
				>
					<SelectTrigger className="w-32 text-black dark:text-white discord:text-white bg-input-light dark:bg-input-dark discord:bg-input-discord">
						<SelectValue placeholder="Ordenar por" />
					</SelectTrigger>
					<SelectContent className="text-black dark:text-white discord:text-white bg-input-light dark:bg-input-dark discord:bg-input-discord">
						<SelectItem value="popularity">Popularity</SelectItem>
						<SelectItem value="debut">Debut</SelectItem>
					</SelectContent>
				</Select>
				<Button 
					onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
					aria-label={`Sort by ${sortField} ${sortOrder === "asc" ? "descending" : "ascending"}`}
					className="text-black border w-2xs dark:text-white discord:text-white bg-input-light dark:bg-input-dark discord:bg-input-discord"
				>
					<ArrowUpDown className="w-4 h-4 mr-2" />
					Sort by {sortField} {sortOrder === "asc" ? "Descending" : "Ascending"}
				</Button>
			</div>

			{/* Sección de columnas */}
			<div className="flex space-x-2 md:mr-3">
				<Button
          onClick={() => onColumnCountChange(1)}
          aria-label="Show 1 column"
					className="relative hidden transition-colors duration-200 rounded-none outline-none md:block"
        >
					<Columns className="w-4 h-4 rotate-90" />
					{columnCount === 1 && (
						<span
							className="absolute bottom-0 left-0 w-full h-1 origin-top bg-green-500 animate-slideIn"
						/>
					)}
        </Button>
				<Button
          onClick={() => onColumnCountChange(2)}
          aria-label="Show 2 columns"
					className="relative hidden transition-colors duration-200 rounded-none outline-hidden md:block"
        >
					<Columns className="w-4 h-4" />
					{columnCount === 2 && (
						<span
							className="absolute bottom-0 left-0 w-full h-1 origin-top bg-green-500 animate-slideIn"
						/>
					)}
        </Button>
				<Button
					onClick={() => onColumnCountChange(3)}
					aria-label="Show 1 column"
					className="relative hidden transition-colors duration-200 rounded-none outline-hidden lg:block"
				>
					<Columns3 className="w-4 h-4" />
					{columnCount === 3 && (
						<span
							className="absolute bottom-0 left-0 w-full h-1 origin-top bg-green-500 animate-slideIn"
						/>
					)}
				</Button>
      </div>
    </div>
	);
}
