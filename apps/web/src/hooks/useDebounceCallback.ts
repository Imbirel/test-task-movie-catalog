import { useCallback, useRef, useLayoutEffect } from 'react';

export function useDebounceCallback<T extends unknown[]>(callback: (...args: T) => void, delay: number) {
  const callbackRef = useRef(callback);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback(
    (...args: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
}
