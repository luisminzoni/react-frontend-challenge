export interface Movie {
	id: string;
	title: string;
	overview?: string;
	rating: number;
	releaseDate: string; // ISO date
	genres: string[];
	posterPath?: string | null;
}

export interface MovieFilters {
	query?: string;
	genre?: string;
	year?: string;
	rating?: number;
	page?: number;
}

export type { Movie as MovieType };
