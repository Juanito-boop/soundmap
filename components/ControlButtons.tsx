import { Button } from "@/components/ui/button"
import { ArrowUpDown, Columns, Columns2, Columns3 } from 'lucide-react'

type ControlButtonsProps = {
  sortOrder: "asc" | "desc"
  onSortOrderChange: (order: "asc" | "desc") => void
  columnCount: 1 | 2
  onColumnCountChange: (count: 1 | 2) => void
}

export function ControlButtons({
  sortOrder,
  onSortOrderChange,
  columnCount,
  onColumnCountChange,
}: ControlButtonsProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <Button
        variant="outline"
        onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
        aria-label={`Sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
      >
        <ArrowUpDown className="mr-2 h-4 w-4" />
        Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
      </Button>
      <div className="space-x-2">
        <Button
          variant={columnCount === 1 ? "default" : "outline"}
          onClick={() => onColumnCountChange(1)}
          aria-label="Show 1 column"
        >
          <Columns className="h-4 w-4" />
        </Button>
        <Button
          variant={columnCount === 2 ? "default" : "outline"}
          onClick={() => onColumnCountChange(2)}
          aria-label="Show 2 columns"
        >
          <Columns2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
