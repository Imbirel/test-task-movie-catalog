import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';

export function useUrlSearch(delay = 300) {
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const initialQuery = searchParams.get('q') || '';
  const [text, setText] = useState(initialQuery);

  const { run: updateUrl, cancel: cancelUpdate } = useDebounceCallback((value: string) => {
    const trimmedValue = value.trim();
    const currentQuery = searchParams.get('q') || '';

    if (currentQuery === (trimmedValue || '')) return;

    setSearchParams(
      (prev) => {
        if (trimmedValue) prev.set('q', trimmedValue);
        else prev.delete('q');
        return prev;
      },
      { replace: true }
    );
  }, delay);

  useEffect(() => {
    setText(initialQuery);
  }, [initialQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\n/g, '').slice(0, 150);
    setText(value);
    updateUrl(value);
  };

  const handleClear = useCallback(() => {
    cancelUpdate();
    setText('');

    setSearchParams(
      (prev) => {
        if (prev.has('q')) prev.delete('q');
        return prev;
      },
      { replace: true }
    );

    inputRef.current?.focus();
  }, [cancelUpdate, setSearchParams]);

  return {
    text,
    inputRef,
    handleChange,
    handleClear,
  };
}
