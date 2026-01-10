import type { Movie } from '@packages/shared';
import { api } from './axios-instance';
import type { GenericAbortSignal } from 'axios';

export async function getMovies(searchTerm?: string, signal?: GenericAbortSignal): Promise<Movie[]> {
  const { data } = await api.get<Movie[]>('/movies', {
    params: {
      title_like: searchTerm || undefined,
    },
    signal,
  });

  return data;
}
