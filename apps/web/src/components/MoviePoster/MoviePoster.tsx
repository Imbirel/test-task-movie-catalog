import fallbackSrc from '/no-poster.avif';
import styles from './MoviePoster.module.css';

interface MoviePosterProps {
  title: string;
  poster: string;
}

export function MoviePoster({ title, poster }: MoviePosterProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.src = fallbackSrc;
    target.onerror = null;
  };

  return (
    <div className={styles['image-container']}>
      <img
        key={poster}
        src={poster || fallbackSrc}
        alt={`Постер фильма ${title}`}
        width="200"
        height="300"
        className={styles['image']}
        onError={handleError}
      />
    </div>
  );
}
