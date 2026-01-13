import type { MovieFull, MoviePreview } from '@packages/shared';
import { memo } from 'react';
import styles from './MovieCard.module.css';
import { MoviePoster } from '@/components/MoviePoster/MoviePoster';

interface MovieCardProps extends MoviePreview {
  onSelect: (id: MovieFull['id']) => void;
  index: number;
  priority: boolean;
}

export const MovieCard = memo(function MovieCard({
  id,
  title,
  poster,
  year,
  onSelect,
  index,
  priority,
}: MovieCardProps) {
  return (
    <article className={styles['movie-card']} role="listitem" aria-posinset={index + 1}>
      <button
        type="button"
        onClick={() => onSelect(id)}
        className={`${styles['movie-card__button']} animate-poster-parent`}
        data-movie-id={id}
        aria-label={`Открыть детали фильма ${title}`}
      >
        <MoviePoster key={id} title={title} poster={poster} priority={priority} />
        <div className={styles['movie-card__info']}>
          <h3 className={styles['movie-card__title']}>{title}</h3>
          <time className={styles['movie-card__year']} dateTime={year.toString()}>
            {year}
          </time>
        </div>
      </button>
    </article>
  );
});
