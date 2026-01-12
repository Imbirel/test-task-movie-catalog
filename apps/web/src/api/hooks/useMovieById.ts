import { useQuery } from '@tanstack/react-query';
import { getMovieById } from '@/api/movies';
import type { MovieDetail, MovieFull } from '@packages/shared';

export function useMovieById(id: MovieFull['id'] | null) {
  return useQuery<MovieDetail>({
    queryKey: ['movie', id],
    queryFn: ({ signal }) => getMovieById(id!, signal),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
}
