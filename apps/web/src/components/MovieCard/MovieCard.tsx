import type { Movie } from '@packages/shared';
import styles from './MovieCard.module.css';
import { useState } from 'react';

export function MovieCard({ title, year, poster }: Movie) {
  const [imgSrc, setImgSrc] = useState(poster);

  return (
    <div className={styles['movie-card']}>
      <div className={styles['movie-card__image-container']}>
        <img
          src={imgSrc}
          alt={title}
          width="200"
          height="300"
          className={styles['movie-card__image']}
          onError={() => setImgSrc('/no-poster.avif')}
        />
      </div>
      <div className={styles['movie-card__info']}>
        <h2 className={styles['movie-card__title']}>{title}</h2>
        <span className={styles['movie-card__year']}>{year}</span>
      </div>
    </div>
  );
}
