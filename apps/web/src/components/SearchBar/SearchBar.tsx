import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import styles from './SearchBar.module.css';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const initialQuery = searchParams.get('q') || '';
  const [text, setText] = useState(initialQuery);

  useEffect(() => {
    setText(initialQuery);
  }, [initialQuery]);

  const updateUrl = useDebounceCallback((value: string) => {
    const trimmedValue = value.trim();

    setSearchParams(
      (prev) => {
        if (trimmedValue) prev.set('q', trimmedValue);
        else prev.delete('q');
        return prev;
      },
      { replace: true }
    );
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    updateUrl(value);
  };

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setText('');
    updateUrl('');
    inputRef.current?.focus();
  }, [updateUrl]);

  return (
    <search className={styles['search']} aria-label="Поиск по каталогу">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-input" className="visually-hidden">
          Введите название для поиска
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 32 32"
          className={styles['search__icon']}
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9"
          />
        </svg>
        <input
          id="search-input"
          ref={inputRef}
          type="search"
          name="q"
          value={text}
          onChange={handleChange}
          placeholder="Поиск по названию..."
          className={styles['search__input']}
          autoComplete="off"
          spellCheck="false"
        />
        {text && (
          <button className={styles['search__clear']} onClick={handleClear} type="button" aria-label="Очистить поиск">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true">
              <path
                fill="currentColor"
                d="M17.414 16L26 7.414L24.586 6L16 14.586L7.414 6L6 7.414L14.586 16L6 24.586L7.414 26L16 17.414L24.586 26L26 24.586z"
              />
            </svg>
          </button>
        )}
      </form>
    </search>
  );
};
