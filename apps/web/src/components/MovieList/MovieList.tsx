import { useState, useCallback } from 'react';
import { MovieCard } from '@/components/MovieCard/MovieCard';
import { Modal } from '@/components/Modal/Modal';
import { useMovies } from '@/api/hooks/useMovies';
import styles from './MovieList.module.css';
import { MovieDetails } from '@/components/MovieDetails/MovieDetails';
import type { MovieFull } from '@packages/shared';

export function MovieList() {
  const { data: movies, isLoading, isError } = useMovies();
  const [selectedMovieId, setSelectedMovieId] = useState<MovieFull['id'] | null>(null);

  const handleSelect = useCallback((id: MovieFull['id']) => {
    setSelectedMovieId(id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedMovieId(null);
  }, []);

  const hasMovies = movies && movies.length > 0;

  if (isLoading) return <div className={styles.loading}>Загрузка...</div>;
  if (isError) return <div className={styles.error}>Ошибка загрузки</div>;

  return (
    <section className={styles['movie-list']} aria-labelledby="movies-heading">
      <h2 id="movies-heading" className="visually-hidden">
        Список фильмов
      </h2>

      {hasMovies ? (
        movies.map((movie) => <MovieCard key={movie.id} {...movie} onSelect={handleSelect} />)
      ) : (
        <p className={styles.empty}>Ничего не найдено</p>
      )}

      <Modal isOpen={!!selectedMovieId} onClose={handleClose}>
        {selectedMovieId && <MovieDetails id={selectedMovieId} />}
      </Modal>
    </section>
  );
}
