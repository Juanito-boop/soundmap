import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { CheckIcon, CircleIcon } from "lucide-react"
import { useCountrySearch } from "@/hooks/useCountrySearch"

type FilterFieldProps = {
	field: keyof FilterFieldProps["filters"]
	filters: {
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
	setFilters: Dispatch<
		SetStateAction<{
			debut: string
			debutMin?: string
			debutMax?: string
			gender: string
			members: string
			country: string
			popularity: string
			popularityMin?: string
			popularityMax?: string
		}>
	>
	matchStatus: {
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
	setMatchStatus: Dispatch<
		SetStateAction<{
			debut: string
			debutMin?: string
			debutMax?: string
			gender: string
			members: string
			country: string
			popularity: string
			popularityMin?: string
			popularityMax?: string
		}>
	>
}

export function FilterField({ field, filters, setFilters, matchStatus, setMatchStatus }: FilterFieldProps) {
	const { distinctCountries, countrySearchTerm, setCountrySearchTerm } = useCountrySearch()
	const [isRangeMode, setIsRangeMode] = useState(false)

	const getInputStyle = (field: keyof typeof matchStatus) => {
		switch (matchStatus[field]) {
			case "correct":
				return "bg-green-900 border-green-500 placeholder:text-white text-white"
			case "higher":
			case "lower":
				return "bg-yellow-900 border-yellow-500 text-white placeholder:text-white"
			case "continent":
				return "bg-yellow-900 border-yellow-500 text-white"
			default:
				return ""
		}
	}

	const renderField = () => {
		if (field === "country" && distinctCountries?.length) {
			return (
				<Select
					value={filters[field] || undefined}
					onValueChange={(value) => {
						setFilters({ ...filters, [field]: value })
						if (field === 'country') {
							setMatchStatus({ ...matchStatus, [field]: 'correct' })
						}
					}}
				>
					<SelectTrigger className={`bg-input text-input-foreground dark:bg-input-dark dark:text-input-foreground-dark ${getInputStyle(field)}`}>
						<SelectValue placeholder="Select country" />
					</SelectTrigger>
					<SelectContent className="bg-input text-input-foreground dark:bg-input-dark dark:text-input-foreground-dark max-h-60">
						<div className="p-2">
							<Input
								type="text"
								placeholder="Search countries..."
								value={countrySearchTerm}
								onChange={(e) => setCountrySearchTerm(e.target.value)}
								className="mb-2 border border-gray-200"
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

		if (field === "gender") {
			return (
				<Select
					value={filters[field] || undefined}
					onValueChange={(value) => {
						setFilters({ ...filters, [field]: value })
						if (field === 'gender') {
							setMatchStatus({ ...matchStatus, [field]: 'correct' })
						}
					}}
				>
					<SelectTrigger className={`bg-input text-input-foreground dark:bg-input-dark dark:text-input-foreground-dark ${getInputStyle(field)}`}>
						<SelectValue placeholder="Select gender" />
					</SelectTrigger>
					<SelectContent className="bg-input text-input-foreground dark:bg-input-dark dark:text-input-foreground-dark">
						{["Female", "Male", "Mixed"].map((gender) => (
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
					value={filters[field] || undefined}
					onValueChange={(value) => setFilters({ ...filters, [field]: value })}
				>
					<SelectTrigger className={`bg-input text-input-foreground dark:bg-input-dark dark:text-input-foreground-dark ${getInputStyle(field)}`}>
						<SelectValue placeholder="Select type" />
					</SelectTrigger>
					<SelectContent className="bg-input text-input-foreground dark:bg-input-dark dark:text-input-foreground-dark">
						{["Solo", "Group"].map((type) => (
							<SelectItem key={type} value={type}>
								{type}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)
		}

		if (field === "debut" || field === "popularity") {
			if (isRangeMode) {
				return (
					<div className="flex space-x-2">
						<Input
							type="number"
							placeholder="Min"
							className="flex-1"
							value={filters[`${field}Min`] || "hover:bg-input"}
							onChange={(e) => setFilters((prev) => ({ ...prev, [`${field}Min`]: e.target.value }))}
						/>
						<Input
							type="number"
							placeholder="Max"
							className="flex-1"
							value={filters[`${field}Max`] || "hover:bg-input"}
							onChange={(e) => setFilters((prev) => ({ ...prev, [`${field}Max`]: e.target.value }))}
						/>
					</div>
				)
			} else {
				return (
					<Input
						type="number"
						value={filters[field]}
						onChange={(e) => setFilters((prev) => ({ ...prev, [field]: e.target.value }))}
						className={`bg-input text-input-foreground dark:bg-input-dark dark:text-input-foreground-dark placeholder:text-black/70 dark:placeholder:text-white ${getInputStyle(field)}`}
						placeholder={`Enter ${field}`}
					/>
				)
			}
		}

		return null
	}

	const renderStatusButtons = () => {
		const setStatus = (status: string) => {
			setMatchStatus((prev) => ({
				...prev,
				[field]: prev[field] === status ? "none" : status,
			}))
		}

		if (field === "country") {
			return (
				<div className="flex space-x-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus("correct")}
						className={`flex-1 h-8 ${matchStatus[field] === "correct" ? "bg-green-600 hover:bg-green-700 text-white" : "hover:bg-input dark:text-input dark:bg-transparent dark:hover:bg-input-dark hover:text-black"}`}
					>
						<CheckIcon className="w-4 h-4" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus("continent")}
						className={`flex-1 h-8 ${matchStatus[field] === "continent" ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "hover:bg-input dark:text-input dark:bg-transparent dark:hover:bg-input-dark hover:text-black"}`}
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
						onClick={() => setStatus("correct")}
						className={`flex-1 h-8  ${matchStatus[field] === "correct" ? "bg-green-600 hover:bg-green-700 text-white" : "hover:bg-input dark:text-input dark:bg-transparent dark:hover:bg-input-dark hover:text-black"}`}
					>
						<CheckIcon className="w-4 h-4" />
					</Button>
				</div>
			)
		}

		if (field === "debut" || field === "popularity") {
			if (!isRangeMode) {
				return (
					<div className="flex space-x-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setStatus("correct")}
							className={`flex-1 h-8 ${matchStatus[field] === "correct" ? "bg-green-600 hover:bg-green-700 text-white" : "hover:bg-input dark:text-input dark:bg-transparent dark:hover:bg-input-dark hover:text-black"}`}
						>
							<CheckIcon className="w-4 h-4" />
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setStatus("lower")}
							className={`flex-1 h-8 ${matchStatus[field] === "lower" ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "hover:bg-input text-black hover:text-black dark:text-input dark:bg-transparent dark:hover:bg-input-dark"}`}
						>
							{field === "debut" ? "Before" : "Lower"}
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setStatus("higher")}
							className={`flex-1 h-8 ${matchStatus[field] === "higher" ? "bg-yellow-600 hover:bg-yellow-700 text-white" : "hover:bg-input text-black hover:text-black dark:text-input dark:bg-transparent dark:hover:bg-input-dark"}`}
						>
							{field === "debut" ? "After" : "Higher"}
						</Button>
					</div>
				)
			}
		}

		return null
	}

	return (
		<Card className="p-4 bg-card text-card-foreground">
			<div className="flex flex-col space-y-2">
				<div className="flex justify-between items-center">
					<label className="text-sm font-medium capitalize justify-start">{field}</label>
					{(field === "debut" || field === "popularity") && (
						<div className="flex gap-x-2">
							<label className="text-sm font-medium capitalize justify-end">Range</label>
							<Switch
								checked={isRangeMode}
								onCheckedChange={setIsRangeMode}
								aria-label="Toggle range mode"
								className="bg-gray-600 data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600 [&>span]:bg-white"
							/>
						</div>
					)}
				</div>
				{renderField()}
				{renderStatusButtons()}
			</div>
		</Card>
	)
}

