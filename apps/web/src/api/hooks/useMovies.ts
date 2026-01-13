import { useDeferredValue } from 'react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getMovies } from '@/api/movies';

export function useMovies() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const deferredQuery = useDeferredValue(query);

  const queryResult = useInfiniteQuery({
    queryKey: ['movies', deferredQuery],
    queryFn: ({ pageParam = 1, signal }) => getMovies(deferredQuery, signal, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const LIMIT = 15;
      return lastPage.length === LIMIT ? allPages.length + 1 : undefined;
    },
    placeholderData: keepPreviousData,
  });

  return {
    ...queryResult,
    movies: queryResult.data?.pages.flatMap((page) => page) ?? [],
    searchTerm: query,
    deferredQuery,
  };
}
