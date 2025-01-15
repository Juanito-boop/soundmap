'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase, type Artist, type Genre, genres } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon, ArrowUpIcon, CheckIcon, CircleIcon, Music2Icon } from 'lucide-react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type MatchStatus = 'none' | 'correct' | 'higher' | 'lower' | 'continent';

const genderOptions = ['Female', 'Male', 'Mixed'] as const;
const memberTypes = ['Solo', 'Group'] as const;

function Home() {
	const [selectedGenre, setSelectedGenre] = useState<Genre>('POP');
	const [filters, setFilters] = useState({
		country: '',
		debut: '',
		gender: '',
		members: '',
		popularity: '',
	});
	const [matchStatus, setMatchStatus] = useState({
		country: 'none' as MatchStatus,
		debut: 'none' as MatchStatus,
		gender: 'none' as MatchStatus,
		members: 'none' as MatchStatus,
		popularity: 'none' as MatchStatus,
	});

	const { data: distinctCountries } = useQuery({
		queryKey: ['countries'],
		queryFn: async () => {
			const { data, error } = await supabase.rpc('get_distinct_countries');
			if (error) throw error;
			return (data as { country: string }[]).filter(item => item.country && item.country.trim() !== '');
		},
	});

	const { data: artists, isLoading } = useQuery<Artist[]>({
		queryKey: ['artists', selectedGenre, filters, matchStatus],
		queryFn: async () => {
			try {
				let query = supabase.from(selectedGenre).select('*');

				if (filters.country && matchStatus.country === 'correct') {
					query = query.eq('country', filters.country);
				}

				if (filters.debut) {
					const debutYear = parseInt(filters.debut);
					if (!isNaN(debutYear)) {
						if (matchStatus.debut === 'correct') {
							query = query.eq('debut', debutYear);
						} else if (matchStatus.debut === 'higher') {
							query = query.gt('debut', debutYear);
						} else if (matchStatus.debut === 'lower') {
							query = query.lt('debut', debutYear);
						}
					}
				}

				if (filters.gender && matchStatus.gender === 'correct') {
					query = query.eq('gender', filters.gender);
				}

				if (filters.members && matchStatus.members === 'correct') {
					query = query.eq('members', filters.members);
				}

				if (filters.popularity) {
					const popularityValue = parseInt(filters.popularity);
					if (!isNaN(popularityValue)) {
						if (matchStatus.popularity === 'correct') {
							query = query.eq('popularity', popularityValue);
						} else if (matchStatus.popularity === 'higher') {
							query = query.gt('popularity', popularityValue);
						} else if (matchStatus.popularity === 'lower') {
							query = query.lt('popularity', popularityValue);
						}
					}
				}

				const { data, error } = await query;
				if (error) throw error;
				return data;
			} catch (error) {
				console.error('Error fetching artists:', error);
				return [];
			}
		},
		enabled: Object.values(filters).some(value => value !== ''),
	});

	const getInputStyle = (field: keyof typeof matchStatus) => {
		switch (matchStatus[field]) {
			case 'correct':
				return 'bg-green-900 border-green-500 text-white';
			case 'higher':
			case 'lower':
				return 'bg-yellow-900 border-yellow-500 text-white';
			case 'continent':
				return 'bg-yellow-900 border-yellow-500 text-white';
			default:
				return 'bg-gray-700 border-gray-600 text-white';
		}
	};

	const setStatus = (field: keyof typeof matchStatus, status: MatchStatus) => {
		setMatchStatus(prev => ({
			...prev,
			[field]: prev[field] === status ? 'none' : status
		}));
	};

	const renderStatusButtons = (field: keyof typeof filters) => {
		if (field === 'country') {
			return (
				<div className="flex space-x-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus(field, 'correct')}
						className={`flex-1 h-8 ${matchStatus[field] === 'correct' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-gray-700'}`}
					>
						<CheckIcon className="w-4 h-4" />
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus(field, 'continent')}
						className={`flex-1 h-8 ${matchStatus[field] === 'continent' ? 'bg-yellow-600 hover:bg-yellow-700' : 'hover:bg-gray-700'}`}
					>
						<CircleIcon className="w-4 h-4" />
					</Button>
				</div>
			);
		}

		if (field === 'gender' || field === 'members') {
			return (
				<div className="flex space-x-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setStatus(field, 'correct')}
						className={`flex-1 h-8 ${matchStatus[field] === 'correct' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-gray-700'}`}
					>
						<CheckIcon className="w-4 h-4" />
					</Button>
				</div>
			);
		}

		return (
			<div className="flex space-x-2">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setStatus(field, 'correct')}
					className={`flex-1 h-8 ${matchStatus[field] === 'correct' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-gray-700'}`}
				>
					<CheckIcon className="w-4 h-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setStatus(field, 'higher')}
					className={`flex-1 h-8 ${matchStatus[field] === 'higher' ? 'bg-yellow-600 hover:bg-yellow-700' : 'hover:bg-gray-700'}`}
				>
					<ArrowUpIcon className="w-4 h-4" />
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setStatus(field, 'lower')}
					className={`flex-1 h-8 ${matchStatus[field] === 'lower' ? 'bg-yellow-600 hover:bg-yellow-700' : 'hover:bg-gray-700'}`}
				>
					<ArrowDownIcon className="w-4 h-4" />
				</Button>
			</div>
		);
	};

	const renderField = (field: keyof typeof filters) => {
		if (field === 'country' && distinctCountries?.length) {
			return (
				<Select
					value={filters.country || undefined}
					onValueChange={(value) => setFilters(prev => ({ ...prev, country: value }))}
				>
					<SelectTrigger className={getInputStyle('country')}>
						<SelectValue placeholder="Select country" />
					</SelectTrigger>
					<SelectContent>
						{distinctCountries.map((item) => (
							item.country && (
								<SelectItem key={item.country} value={item.country}>
									{item.country}
								</SelectItem>
							)
						))}
					</SelectContent>
				</Select>
			);
		}

		if (field === 'gender') {
			return (
				<Select
					value={filters.gender || undefined}
					onValueChange={(value) => setFilters(prev => ({ ...prev, gender: value }))}
				>
					<SelectTrigger className={getInputStyle('gender')}>
						<SelectValue placeholder="Select gender" />
					</SelectTrigger>
					<SelectContent>
						{genderOptions.map((gender) => (
							<SelectItem key={gender} value={gender}>
								{gender}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			);
		}

		if (field === 'members') {
			return (
				<Select
					value={filters.members || undefined}
					onValueChange={(value) => setFilters(prev => ({ ...prev, members: value }))}
				>
					<SelectTrigger className={getInputStyle('members')}>
						<SelectValue placeholder="Select type" />
					</SelectTrigger>
					<SelectContent>
						{memberTypes.map((type) => (
							<SelectItem key={type} value={type}>
								{type}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			);
		}

		return (
			<Input
				type={field === 'debut' || field === 'popularity' ? 'number' : 'text'}
				value={filters[field]}
				onChange={(e) => setFilters(prev => ({ ...prev, [field]: e.target.value }))}
				className={getInputStyle(field as keyof typeof matchStatus)}
				placeholder={`Enter ${field}`}
			/>
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
			<div className="max-w-4xl mx-auto">
				<div className="flex items-center justify-center mb-8">
					<Music2Icon className="w-8 h-8 mr-2" />
					<h1 className="text-3xl font-bold">SoundMap Artist Finder</h1>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
					<Card className="p-4 bg-gray-800 border-gray-700">
						<div className="flex flex-col space-y-2">
							<label className="text-sm font-medium text-white">
								Genre
							</label>
							<Select value={selectedGenre} onValueChange={(value) => setSelectedGenre(value as Genre)}>
								<SelectTrigger className={`bg-gray-700 border-gray-600 text-white`}>
									<SelectValue placeholder="Select genre" />
								</SelectTrigger>
								<SelectContent>
									{genres.map((genre) => (
										<SelectItem key={genre} value={genre}>
											{genre}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</Card>

					{(['country', 'debut', 'gender', 'members', 'popularity'] as const).map((field) => (
						<Card key={field} className="p-4 bg-gray-800 border-gray-700">
							<div className="flex flex-col space-y-2">
								<label className="text-sm font-medium text-white capitalize">
									{field}
								</label>
								{renderField(field)}
								{renderStatusButtons(field)}
							</div>
						</Card>
					))}
				</div>

				<div className="mt-8">
					{isLoading ? (
						<p className="text-center text-gray-400">Searching...</p>
					) : artists && artists.length > 0 ? (
						<div className="space-y-4">
							{artists.map((artist) => (
								<Card key={artist.id} className="p-4 bg-gray-800 border-gray-700">
									<div className="grid grid-cols-2 gap-4">
										<div>
											<h3 className="font-bold text-lg text-gray-50">{artist.name}</h3>
											<p className="text-gray-400">Country: {artist.country}</p>
											<p className="text-gray-400">Debut: {artist.debut}</p>
										</div>
										<div>
											<p className="text-gray-400">Gender: {artist.gender}</p>
											<p className="text-gray-400">Members: {artist.members}</p>
											<p className="text-gray-400">Popularity: {artist.popularity}</p>
										</div>
									</div>
								</Card>
							))}
						</div>
					) : artists?.length === 0 ? (
						<p className="text-center text-gray-400">No artists found matching your criteria</p>
					) : (
						<p className="text-center text-gray-400">Enter the information from your game to find possible artists</p>
					)}
				</div>

				<div className="mt-8 text-center">
					<Button
						onClick={() => {
							setFilters({
								country: '',
								debut: '',
								gender: '',
								members: '',
								popularity: '',
							});
							setMatchStatus({
								country: 'none',
								debut: 'none',
								gender: 'none',
								members: 'none',
								popularity: 'none',
							});
						}}
						variant="outline"
						className="bg-gray-700 hover:bg-gray-600 text-white"
					>
						Clear Search
					</Button>
				</div>
			</div>
		</div>
	);
}

export default function Page() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Home />
		</QueryClientProvider>
	)
}