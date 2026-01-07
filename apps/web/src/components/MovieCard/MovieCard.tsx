import type { Movie } from '@packages/shared';
import styles from './MovieCard.module.css';
import { useState } from 'react';
import { Modal } from '@/components/Modal/Modal';

export function MovieCard({ title, year, genre, rating, description, poster }: Movie) {
  const [imgSrc, setImgSrc] = useState(poster);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article className={styles['movie-card']}>
        <button type="button" className={styles['movie-card__button']} onClick={() => setIsModalOpen(true)}>
          <div className={styles['movie-card__image-container']}>
            <img
              src={imgSrc}
              alt=""
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
        </button>
      </article>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={title}>
        <article className={styles['movie-card__modal-content']}>
          <div className={styles['movie-card__modal-aside']}>
            <img
              src={imgSrc}
              alt={title}
              width="200"
              height="300"
              className={styles['movie-card__modal-poster']}
              onError={() => setImgSrc('/no-poster.avif')}
            />
          </div>

          <div className={styles['movie-card__modal-main']}>
            <h2 className={styles['movie-card__modal-title']}>
              {title}
            </h2>
            <span className={styles['movie-card__modal-year']}>{year}</span>

            <div className={styles['movie-card__modal-genres']}>
              {genre.map((gen) => (
                <span key={gen} className={styles['movie-card__badge']}>
                  {gen}
                </span>
              ))}
            </div>

            <p className={styles['movie-card__modal-description']}>{description}</p>

            <div className={styles['movie-card__modal-rating']}>
              <span className={styles['movie-card__badge']}>{rating}</span>
            </div>
          </div>
        </article>
      </Modal>
    </>
  );
}
