export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  director: string;
  description: string;
  poster: string;
  duration: string;
  cast: string[];
}

export interface MoviesResponse {
  data: Movie[];
  total: number;
}

export interface MovieFilters {
  search?: string;
  page?: number;
  limit?: number;
}