import { SearchBar } from '../SearchBar/SearchBar';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>Каталог фильмов</h1>
      <SearchBar />
    </header>
  );
}
