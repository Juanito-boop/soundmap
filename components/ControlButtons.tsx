// ControlButtons.tsx
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Columns } from "lucide-react";

type ControlButtonsProps = {
	sortOrder: "asc" | "desc";
	onSortOrderChange: (order: "asc" | "desc") => void;
	sortField: "popularity" | "debut";
	onSortFieldChange: (field: "popularity" | "debut") => void;
	columnCount: 1 | 2;
	onColumnCountChange: (count: 1 | 2) => void;
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
		<div className="flex flex-col md:flex-row md:justify-between items-center mb-4 space-y-2 md:space-y-0">
			{/* Sección de ordenamiento */}
			<div className="flex flex-col md:flex-row items-start space-x-2 space-y-2">
				<Select
					value={sortField}
					onValueChange={(value) =>
						onSortFieldChange(value as "popularity" | "debut")
					}
				>
					<SelectTrigger className="w-[180px] bg-input dark:bg-input-dark ">
						<SelectValue placeholder="Ordenar por" />
					</SelectTrigger>
					<SelectContent className="bg-input dark:bg-input-dark ">
						<SelectItem value="popularity">Popularity</SelectItem>
						<SelectItem value="debut">Debut</SelectItem>
					</SelectContent>
				</Select>
				<Button 
					onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
					aria-label={`Sort by ${sortField} ${sortOrder === "asc" ? "descending" : "ascending"}`}
					className="dark:bg-input-dark bg-input border border-input"
				>
					<ArrowUpDown className="mr-2 h-4 w-4" />
					Sort by {sortField} {sortOrder === "asc" ? "Descending" : "Ascending"}
				</Button>
			</div>

			{/* Sección de columnas */}
			<div className="flex space-x-2 md:mr-3">
				<Button
          onClick={() => onColumnCountChange(1)}
          aria-label="Show 1 column"
					className="relative transition-colors duration-200 rounded-none outline-hidden"
        >
					<Columns className="h-4 w-4 rotate-90" />
					{columnCount === 1 && (
						<span
							className="absolute bottom-0 left-0 h-1 w-full bg-green-500 origin-top animate-slideIn"
						/>
					)}
        </Button>
				<Button
          onClick={() => onColumnCountChange(2)}
          aria-label="Show 2 columns"
					className="relative transition-colors duration-200 rounded-none outline-hidden"
        >
					<Columns className="h-4 w-4" />
					{columnCount === 2 && (
						<span
							className="absolute bottom-0 left-0 h-1 w-full bg-green-500 origin-top animate-slideIn"
						/>
					)}
        </Button>
      </div>
    </div>
	);
}
