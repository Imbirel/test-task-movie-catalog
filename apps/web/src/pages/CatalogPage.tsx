import { Header } from '../components/Header/Header';
import { MovieList } from '../components/MovieList/MovieList';
import styles from './CatalogPage.module.css';

export function CatalogPage() {
  return (
    <div className={styles['page-wrapper']}>
      <Header />
      <main>
        <MovieList />
      </main>
    </div>
  );
}
