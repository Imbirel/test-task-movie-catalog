import { useState, useCallback } from 'react';
import { MovieCard } from '@/components/MovieCard/MovieCard';
import { Modal } from '@/components/Modal/Modal';
import styles from './MovieList.module.css';
import { MovieDetails } from '@/components/MovieDetails/MovieDetails';
import type { MovieFull } from '@packages/shared';
import { useVirtualGrid } from '@/hooks/useVirtualGrid';

export function MovieList() {
  const {movies, isLoading, isError, listRef, rowVirtualizer, virtualRows, columns, scrollMargin} = useVirtualGrid();
  const [selectedMovieId, setSelectedMovieId] = useState<MovieFull['id'] | null>(null);

  const handleSelect = useCallback((id: MovieFull['id']) => {
    setSelectedMovieId(id);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedMovieId(null);
  }, []);

  const hasMovies = !!movies?.length;

  if (isLoading)
    return (
      <div className={styles['movie-list__status']} aria-live="polite">
        Загрузка...
      </div>
    );
  if (isError) return <div className={styles['movie-list__status']}>Ошибка загрузки</div>;

  return (
    <section aria-labelledby="movies-heading">
      <h2 id="movies-heading" className="visually-hidden">
        Список фильмов
      </h2>

      {hasMovies ? (
        <div
          ref={listRef}
          className={styles['movie-list']}
          style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          role="list"
          aria-setsize={movies.length}
        >
          {virtualRows.map((virtualRow) => {
            const startIndex = virtualRow.index * columns;
            const rowItems = movies.slice(startIndex, startIndex + columns);
            const isLoaderRow = startIndex >= movies.length;

            return (
              <div
                key={virtualRow.key}
                className={styles['movie-list__row']}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start - scrollMargin}px)`,
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                }}
                role="presentation"
              >
                {isLoaderRow ? (
                  <div className={styles['movie-list__loader']} role="status" aria-live="polite">
                    Загружаем еще...
                  </div>
                ) : (
                  rowItems.map((movie, subIndex) => {
                    const movieIndex = startIndex + subIndex;

                    return <MovieCard key={movie.id} {...movie} onSelect={handleSelect} index={movieIndex} />;
                  })
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className={styles['movie-list__status']}>Ничего не найдено</p>
      )}

      <Modal isOpen={selectedMovieId !== null} onClose={handleClose}>
        {selectedMovieId && <MovieDetails id={selectedMovieId} />}
      </Modal>
    </section>
  );
}
