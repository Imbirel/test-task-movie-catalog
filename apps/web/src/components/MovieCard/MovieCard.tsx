import type { Movie } from '@packages/shared';
import styles from './MovieCard.module.css';
import { MoviePoster } from '@/components/MoviePoster/MoviePoster';

export function MovieCard({ id, title, year, poster }: Movie) {
  return (
    <article className={styles['movie-card']}>
      <button
        type="button"
        className={`${styles['movie-card__button']} animate-poster-parent`}
        data-movie-id={id}
        aria-label={`Открыть детали фильма ${title}`}
      >
        <MoviePoster title={title} poster={poster} />
        <div className={styles['movie-card__info']}>
          <h2 className={styles['movie-card__title']}>{title}</h2>
          <span className={styles['movie-card__year']}>{year}</span>
        </div>
      </button>
    </article>
  );
}
