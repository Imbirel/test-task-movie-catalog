import { useState, useCallback, useRef, useEffect } from 'react';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useMovies } from '@/api/hooks/useMovies';
import { useDebounceCallback } from '@/hooks/useDebounceCallback';

export function useVirtualGrid() {
  const query = useMovies();
  const { movies, hasNextPage, isFetchingNextPage, fetchNextPage } = query;

  const [scrollMargin, setScrollMargin] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const observerRef = useRef<ResizeObserver | null>(null);

  const { run: debouncedSetWidth, cancel: cancelDebounce } = useDebounceCallback((width: number) => {
    setContainerWidth(width);
  }, 150);

  const listRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();

      if (node !== null) {
        setScrollMargin(node.offsetTop);
        setContainerWidth(node.offsetWidth);

        observerRef.current = new ResizeObserver((entries) => {
          debouncedSetWidth(entries[0].contentRect.width);
          setScrollMargin(node.offsetTop);
        });
        observerRef.current.observe(node);
      }
    },
    [debouncedSetWidth]
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      cancelDebounce();
    };
  }, [cancelDebounce]);

  const columns = Math.max(1, Math.floor(containerWidth / 250));
  const rowCount = Math.ceil((movies.length + (hasNextPage ? 1 : 0)) / columns);

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 480,
    scrollMargin,
    overscan: 5,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const lastVirtualRowIndex = virtualRows.at(-1)?.index;

  useEffect(() => {
    if (
      lastVirtualRowIndex !== undefined &&
      lastVirtualRowIndex >= rowCount - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [lastVirtualRowIndex, rowCount, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    ...query,
    listRef,
    rowVirtualizer,
    virtualRows,
    columns,
    scrollMargin,
  };
}
