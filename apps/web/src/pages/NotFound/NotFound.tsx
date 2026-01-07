import { Link } from 'react-router';
import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <div className={styles['page-wrapper']}>
      <h1>404</h1>
      <p>Упс! Похоже, такая страница не существует.</p>
      <Link to="/">
        Вернуться на главную
      </Link>
    </div>
  );
}
