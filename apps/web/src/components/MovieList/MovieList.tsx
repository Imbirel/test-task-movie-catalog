import { useEffect, useState } from 'react';
import { getMovies } from '../../api/api';
import { MovieCard } from '../MovieCard/MovieCard';
import type { Movie } from '@packages/shared';
import styles from './MovieList.module.css';

export function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  return (
    <div className={styles.list}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
}
