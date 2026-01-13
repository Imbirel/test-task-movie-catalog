import type { MovieDetail, MovieFull, MoviePreview } from '@packages/shared';
import { api } from './axios-instance';
import type { GenericAbortSignal } from 'axios';

export async function getMovies(searchTerm?: string, signal?: GenericAbortSignal, page: number = 1): Promise<MoviePreview[]> {
  const { data } = await api.get<MoviePreview[]>('/movies', {
    params: {
      title_like: searchTerm || undefined,
      _fields: 'id,title,poster,year',
      _page: page,
      _limit: 15,
    },
    signal,
  });

  return data;
}

export async function getMovieById(id: MovieFull['id'], signal?: GenericAbortSignal): Promise<MovieDetail> {
  const { data } = await api.get<MovieDetail>(`/movies/${id}`, {
    params: {
      _fields: 'id,title,poster,year,genre,description,rating',
    },
    signal,
  });

  return data;
}
