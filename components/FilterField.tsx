import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { CheckIcon, ChevronDown, ChevronUp, CircleIcon } from "lucide-react"
import { useCountrySearch } from "@/hooks/useCountrySearch"

type Filters = {
	debut: string
	debutMin?: string
	debutMax?: string
	gender: string
	members: string
	country: string
	popularity: string
	popularityMin?: string
	popularityMax?: string
}

type FilterFieldProps = {
	field: keyof Filters
	filters: Filters
	setFilters: Dispatch<SetStateAction<Filters>>
	matchStatus: Filters
	setMatchStatus: Dispatch<SetStateAction<Filters>>
}

export function FilterField({
	field,
	filters,
	setFilters,
	matchStatus,
	setMatchStatus,
}: FilterFieldProps) {
	const { distinctCountries, countrySearchTerm, setCountrySearchTerm } = useCountrySearch()
	const [isRangeMode, setIsRangeMode] = useState(false)

	const inputStyles: Record<string, string> = {
		correct: "bg-green-900 border-green-500 placeholder:text-white text-white",
		higher: "bg-yellow-900 border-yellow-500 text-white placeholder:text-white",
		lower: "bg-yellow-900 border-yellow-500 text-white placeholder:text-white",
		continent: "bg-yellow-900 border-yellow-500 text-white",
	}

	const getInputStyle = (field: keyof typeof matchStatus) => {
		const status = matchStatus[field];
		return status ? inputStyles[status] || "" : "";
	}

	// Common handler for select fields.
	const handleSelectChange = (value: string) => {
		setFilters({ ...filters, [field]: value })
		if (["country", "gender"].includes(field)) {
			setMatchStatus({ ...matchStatus, [field]: "correct" })
		}
	}

	// Country select component with search.
	const renderCountrySelect = () => (
		<Select value={filters.country || undefined} onValueChange={handleSelectChange}>
			<SelectTrigger
				className={`${getInputStyle("country")} bg-input-light text-input-dark border-black/60 focus:ring-0 focus:ring-offset-0 dark:bg-input-dark dark:text-input-light dark:border-white dark:focus:ring-0 dark:focus:ring-offset-0 discord:bg-input-discord discord:text-input-light discord:border-white discord:focus:ring-0 discord:focus:ring-offset-0`}
			>
				<SelectValue placeholder="Select country" />
			</SelectTrigger>
			<SelectContent 
				className="bg-input-light text-input-dark dark:bg-input-dark dark:text-white discord:bg-input-discord discord:text-input-light max-h-60 border-black/60 dark:border-white discord:border-white"
				onPointerDownOutside={(e) => e.preventDefault()}
			>
				<div className="p-2">
					<Input
						type="text"
						placeholder="Search countries..."
						value={countrySearchTerm}
						onChange={(e) => setCountrySearchTerm(e.target.value)}
						onKeyDown={(e) => e.stopPropagation()}
						onClick={(e) => e.stopPropagation()}
						className="bg-input-light text-input-light dark:bg-input-dark discord:bg-input-discord dark:text-input-light discord:text-white placeholder:text-black/70 dark:placeholder:text-white discord:placeholder:text-white border-black/60 dark:border-white discord:border-white focus:ring-0 focus:ring-offset-0 dark:focus:ring-0 dark:focus:ring-offset-0"
					/>
				</div>
				{distinctCountries
					?.filter((item) => item.country?.toLowerCase().includes(countrySearchTerm.toLowerCase()))
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

	// Generic select renderer
	const renderGenericSelect = (options: string[], placeholder: string) => (
		<Select value={filters[field] || undefined} onValueChange={handleSelectChange}>
			<SelectTrigger
				className={`bg-input-light text-input-dark dark:bg-input-dark dark:text-input-light discord:bg-input-discord discord:text-input-light border-black/60 dark:border-white discord:border-white focus:ring-0 focus:ring-offset-0 dark:focus:ring-0 dark:focus:ring-offset-0 ${getInputStyle(field)}`}
			>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent className="bg-input-light text-input-dark dark:bg-input-dark dark:text-input-light discord:bg-input-discord discord:text-input-light border-black/60 dark:border-white discord:border-white">
				{options.map((option) => (
					<SelectItem key={option} value={option}>
						{option}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)

	// Renders numeric input(s) for fields that require a number.
	const renderNumericField = () => {
		if (isRangeMode) {
			return (
				<div className="flex space-x-2">
					<Input
						type="number"
						placeholder="Min"
						className="flex-1 bg-input-light text-input-light dark:bg-input-dark discord:bg-input-discord dark:text-input-light discord:text-white placeholder:text-black/70 dark:placeholder:text-white discord:placeholder:text-white border-black/60 dark:border-white discord:border-white focus:ring-0 focus:ring-offset-0 dark:focus:ring-0 dark:focus:ring-offset-0 focus-visible:ring-0 dark:focus-visible:ring-0 discord:focus-visible:ring-0"
						value={filters[`${field}Min` as keyof Filters] || ""}
						onChange={(e) => setFilters((prev) => ({ ...prev, [`${field}Min`]: e.target.value }))}
					/>
					<Input
						type="number"
						placeholder="Max"
						className="flex-1 bg-input-light text-input-light dark:bg-input-dark discord:bg-input-discord dark:text-input-light discord:text-white placeholder:text-black/70 dark:placeholder:text-white discord:placeholder:text-white border-black/60 dark:border-white discord:border-white focus:ring-0 focus:ring-offset-0 dark:focus:ring-0 dark:focus:ring-offset-0 focus-visible:ring-0 dark:focus-visible:ring-0 discord:focus-visible:ring-0"
						value={filters[`${field}Max` as keyof Filters] || ""}
						onChange={(e) => setFilters((prev) => ({ ...prev, [`${field}Max`]: e.target.value }))}
					/>
				</div>
			)
		}
		return (
			<Input
				type="number"
				value={filters[field]}
				onChange={(e) => setFilters({ ...filters, [field]: e.target.value })}
				className={`bg-input-light text-input-light dark:bg-input-dark discord:bg-input-discord dark:text-input-light discord:text-white placeholder:text-black/70 dark:placeholder:text-white discord:placeholder:text-white border-black/60 dark:border-white discord:border-white focus:ring-0 focus:ring-offset-0 dark:focus:ring-0 dark:focus:ring-offset-0 focus-visible:ring-0 dark:focus-visible:ring-0 discord:focus-visible:ring-0 ${getInputStyle(field)}`}
				placeholder={`Enter ${field}`}
			/>
		)
	}

	// Decide which field to render based on type.
	const renderField = () => {
		switch (field) {
			case "country":
				return distinctCountries?.length ? renderCountrySelect() : null
			case "gender":
				return renderGenericSelect(["Female", "Male", "Mixed"], "Select gender")
			case "members":
				return renderGenericSelect(["Solo", "Group"], "Select type")
			case "debut":
			case "popularity":
				return renderNumericField()
			default:
				return null
		}
	}

	// Handler to toggle button statuses.
	const toggleStatus = (status: string) =>
		setMatchStatus((prev) => ({
			...prev,
			[field]: prev[field] === status ? "none" : status,
		}))

	// Renders status buttons according to the field.
	const renderStatusButtons = () => {
		if (field === "country") {
			return (
				<div className="flex space-x-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => toggleStatus("correct")}
						className={`flex-1 h-8 ${
							matchStatus.country === "correct"
							? "bg-green-600 hover:bg-green-700 text-white" 
							: "text-black hover:bg-input-light hover:text-black dark:text-input-light dark:hover:bg-input-dark dark:hover:text-input-light discord:text-white discord:hover:bg-input-discord discord:hover:text-white"
						}`}
					>
						<CheckIcon className="w-4 h-4" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => toggleStatus("continent")}
						className={`flex-1 h-8 ${
							matchStatus.country === "continent"
							? "bg-yellow-600 hover:bg-yellow-700 text-white"
							: "text-black hover:bg-input-light hover:text-black dark:text-input-light dark:hover:bg-input-dark dark:hover:text-input-light discord:text-white discord:hover:bg-input-discord discord:hover:text-white"
						}`}
					>
						<CircleIcon className="w-4 h-4" />
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
						onClick={() => toggleStatus("correct")}
						className={`flex-1 h-8 ${
							matchStatus[field] === "correct"
							? "bg-green-600 hover:bg-green-700 text-white"
							: "text-black hover:bg-input-light hover:text-black dark:text-input-light dark:hover:bg-input-dark dark:hover:text-input-light discord:text-white discord:hover:bg-input-discord discord:hover:text-white"
						}`}
					>
						<CheckIcon className="w-4 h-4" />
					</Button>
				</div>
			)
		}
		if ((field === "debut" || field === "popularity") && !isRangeMode) {
			const labels = field === "debut" ? { lower: "Before", higher: "After" } : { lower: "Lower", higher: "Higher" }
			return (
				<div className="flex space-x-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => toggleStatus("correct")}
						className={`flex-1 h-8 ${
							matchStatus[field] === "correct"
							? "bg-green-600 hover:bg-green-700 text-white"
							: "text-black hover:bg-input-light hover:text-black dark:text-input-light dark:hover:bg-input-dark dark:hover:text-input-light discord:text-white discord:hover:bg-input-discord discord:hover:text-white"
						}`}
					>
						<CheckIcon className="w-4 h-4" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => toggleStatus("lower")}
						className={`flex-1 h-8 ${
							matchStatus[field] === "lower"
							? "bg-yellow-600 hover:bg-yellow-700 text-white"
							: "text-black hover:bg-input-light hover:text-black dark:text-input-light dark:hover:bg-input-dark dark:hover:text-input-light discord:text-white discord:hover:bg-input-discord discord:hover:text-white"
						}`}
					>
						{labels.lower} {labels.lower === "Lower" ? <ChevronUp /> : <ChevronDown />}
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => toggleStatus("higher")}
						className={`flex-1 h-8 ${
							matchStatus[field] === "higher"
								? "bg-yellow-600 hover:bg-yellow-700 text-white"
							: "text-black hover:bg-input-light hover:text-black dark:text-input-light dark:hover:bg-input-dark dark:hover:text-input-light discord:text-white discord:hover:bg-input-discord discord:hover:text-white"
							}`}
					>
						{labels.higher} {labels.higher === "Higher" ? <ChevronDown /> : <ChevronUp />}
					</Button>
				</div>
			)
		}
		return null
	}

	return (
		<Card className="p-4 bg-card-light dark:bg-card-dark discord:bg-card-discord text-card-foreground">
			<div className="flex flex-col space-y-2">
				<div className="flex items-center justify-between">
					<label className="text-sm font-medium capitalize">{field}</label>
					{(field === "debut" || field === "popularity") && (
						<div className="flex gap-x-2">
							<label className="text-sm font-medium capitalize">Range</label>
							<Switch
								checked={isRangeMode}
								onCheckedChange={setIsRangeMode}
								aria-label="Toggle range mode"
								className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600 [&>span]:bg-white"
							/>
						</div>
					)}
					{(field === "members" || field === "country" || field === "gender") && (
						<Switch
							checked={isRangeMode}
							onCheckedChange={setIsRangeMode}
							aria-label="Toggle range mode"
							className={	
								`data-[state=checked]:bg-card-light data-[state=unchecked]:bg-card-light [&>span]:bg-card-light [&>span]:shadow-none cursor-default` +
								`dark:[&>span]:shadow-none dark:data-[state=checked]:bg-card-dark dark:data-[state=unchecked]:bg-card-dark dark:[&>span]:bg-card-dark cursor-default` +
								`discord:[&>span]:shadow-none discord:data-[state=checked]:bg-card-discord discord:data-[state=unchecked]:bg-card-discord discord:[&>span]:bg-card-discord cursor-default`}
						/>
					)}
				</div>
				{renderField()}
				{renderStatusButtons()}
			</div>
		</Card>
	)
}
