import { MovieCard } from '@/components/MovieCard/MovieCard';
import styles from './MovieList.module.css';
import { useMovies } from '@/api/hooks/useMovies';
import { Modal } from '@/components/Modal/Modal';
import { useState } from 'react';
import type { Movie } from '@packages/shared';
import { MoviePoster } from '@/components/MoviePoster/MoviePoster';

export function MovieList() {
  const { data: movies, isPlaceholderData, isLoading, isError } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleListClick = (e: React.MouseEvent<HTMLElement>) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-movie-id]');
    const movieId = Number(btn?.dataset.movieId);
    const movie = movies?.find((m) => m.id === movieId);

    if (movie) setSelectedMovie(movie);
  };

  if (isLoading) return <div className={styles['movie-list__loading']}>Загрузка...</div>;
  if (isError) return <div className={styles['movie-list__error']}>Ошибка загрузки</div>;

  return (
    <section
      className={`${styles['movie-list']} ${isPlaceholderData ? styles['loading-overlay'] : ''}`}
      onClick={handleListClick}
    >
      {movies?.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
      {movies?.length === 0 && <p className={styles['movie-list__empty']}>Ничего не найдено</p>}

      {selectedMovie && (
        <Modal isOpen={!!selectedMovie} onClose={() => setSelectedMovie(null)} title={selectedMovie.title}>
          <article className={styles['movie-card__modal-content']}>
            <MoviePoster title={selectedMovie.title} poster={selectedMovie.poster} />

            <div className={styles['movie-card__modal-info']}>
              <h2 className={styles['movie-card__modal-title']}>{selectedMovie.title}</h2>
              <span className={styles['movie-card__modal-year']}>{selectedMovie.year}</span>

              <div className={styles['movie-card__modal-genres']}>
                {selectedMovie.genre.map((gen) => (
                  <span key={gen} className={styles['movie-card__badge']}>
                    {gen}
                  </span>
                ))}
              </div>

              <p className={styles['movie-card__modal-description']}>{selectedMovie.description}</p>

              <div className={styles['movie-card__modal-rating']}>
                <span className={styles['movie-card__badge']}>{selectedMovie.rating}</span>
              </div>
            </div>
          </article>
        </Modal>
      )}
    </section>
  );
}
