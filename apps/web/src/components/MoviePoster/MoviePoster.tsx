import fallbackSrc from '/no-poster.avif';
import styles from './MoviePoster.module.css';
import type { MovieFull } from '@packages/shared';
import { useState } from 'react';

interface MoviePosterProps extends Pick<MovieFull, 'title' | 'poster'> {
  priority?: boolean;
}

export function MoviePoster({ title, poster, priority = false }: MoviePosterProps) {
  const [imgSrc, setImgSrc] = useState(poster || fallbackSrc);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <div className={styles['image-container']}>
      <img
        key={poster}
        src={imgSrc}
        alt={`Постер фильма ${title}`}
        width="200"
        height="300"
        className={styles['image']}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
      />
    </div>
  );
}
