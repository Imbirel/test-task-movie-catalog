import type { Movie } from "@packages/shared";

export async function getMovies(): Promise<Movie[]> {
  const response = await fetch('http://localhost:3001/movies');

  if (!response.ok) {
    throw new Error(`Ошибка загрузки: ${response.statusText}`);
  }

  return response.json() as Promise<Movie[]>;
}