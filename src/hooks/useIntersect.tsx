import { useCallback, useRef } from 'react';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';

import { InfiniteReturnType } from 'utils/interfaces';

const useIntersect = (
  callback: IntersectionObserverCallback,
  hasNextPage?: boolean,
  fetchNextPage?: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteReturnType, Error>>,
) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLLIElement) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(callback, {
        threshold: 1,
      });

      if (node) observer.current.observe(node);
    },

    [hasNextPage, fetchNextPage],
  );

  return ref;
};

export default useIntersect;
