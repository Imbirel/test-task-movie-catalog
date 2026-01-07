import type { Movie } from '@packages/shared';
import { api } from './axios-instance';

export async function getMovies(searchTerm?: string): Promise<Movie[]> {
  const { data } = await api.get<Movie[]>('/movies', {
    params: {
      title_like: searchTerm || undefined,
    },
  });

  return data;
}
