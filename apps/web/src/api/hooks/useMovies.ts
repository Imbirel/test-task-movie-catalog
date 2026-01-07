import { useDeferredValue } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { getMovies } from '@/api/movies';

export function useMovies() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const deferredQuery = useDeferredValue(query);

  const queryResult = useQuery({
    queryKey: ["movies", deferredQuery],
    queryFn: () => getMovies(deferredQuery),
    placeholderData: keepPreviousData,
    staleTime: 0,
  });

  return {
    ...queryResult,
    searchTerm: query,
    deferredQuery,
  };
}
