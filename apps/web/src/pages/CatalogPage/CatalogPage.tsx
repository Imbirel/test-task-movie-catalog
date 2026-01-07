import { Header } from '@/components/Header/Header';
import styles from './CatalogPage.module.css';
import { MovieList } from '@/components/MovieList/MovieList';

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
