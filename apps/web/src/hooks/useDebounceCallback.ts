import { useCallback, useRef, useLayoutEffect, useEffect, useMemo } from 'react';

export function useDebounceCallback<T extends unknown[]>(callback: (...args: T) => void, delay: number) {
  const callbackRef = useRef(callback);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  useEffect(() => {
    return cancel;
  }, [cancel, delay]);

  const run = useCallback(
    (...args: T) => {
      cancel();
      timer.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay, cancel]
  );

  return useMemo(() => ({ run, cancel }), [run, cancel]);
}
