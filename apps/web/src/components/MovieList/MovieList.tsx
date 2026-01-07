import { MovieCard } from '@/components/MovieCard/MovieCard';
import styles from './MovieList.module.css';
import { useMovies } from '@/api/hooks/useMovies';

export function MovieList() {
  const { data: movies, isPlaceholderData, isLoading } = useMovies();

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <search
      className={`${styles['movie-list']} ${isPlaceholderData ? styles.loadingOverlay : ''}`}
      aria-label="Результаты"
    >
      {movies?.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
      {movies?.length === 0 && <p className={styles['movie-list__empty']}>Ничего не найдено</p>}
    </search>
  );
}
