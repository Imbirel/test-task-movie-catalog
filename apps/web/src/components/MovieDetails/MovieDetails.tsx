import { useMovieById } from '@/api/hooks/useMovieById';
import { MoviePoster } from '@/components/MoviePoster/MoviePoster';
import styles from './MovieDetails.module.css';
import type { MovieFull } from '@packages/shared';

interface MovieDetailsProps {
  id: MovieFull['id'];
}

export function MovieDetails({ id }: MovieDetailsProps) {
  const { data: movie, isLoading, isError } = useMovieById(id);

  if (isLoading) return <div className={styles['loading']} aria-live="polite">Загружаем детали...</div>;
  if (isError || !movie) return <div className={styles['error']}>Фильм не найден</div>;

  const { title, year, genre, description, rating, poster } = movie;

  return (
    <article className={styles['details']}>
      <MoviePoster title={title} poster={poster} priority={true} />

      <div className={styles['details__info']}>
        <h2 className={styles['details__title']}>{title}</h2>
        <time className={styles['details__year']} dateTime={String(year)}>
          {year}
        </time>

        {!!genre?.length && (
          <ul className={styles['details__genres']} aria-label="Жанры">
            {genre.map((gen) => (
              <li key={gen} className={styles['badge']}>
                {gen}
              </li>
            ))}
          </ul>
        )}

        {description && <p className={styles['details__description']}>{description}</p>}

        {rating !== undefined && (
          <div className={styles['details__rating']}>
            <span className="visually-hidden">Рейтинг:</span>
            <span className={styles['badge']}>{rating}</span>
          </div>
        )}
      </div>
    </article>
  );
}
