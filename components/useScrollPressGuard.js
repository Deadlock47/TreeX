import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function useScrollPressGuard(resetDelay = 150) {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollResetTimer = useRef(null);

  const markScrolling = useCallback(() => {
    if (scrollResetTimer.current) {
      clearTimeout(scrollResetTimer.current);
    }
    setIsScrolling(true);
  }, []);

  const markScrollEnded = useCallback(() => {
    if (scrollResetTimer.current) {
      clearTimeout(scrollResetTimer.current);
    }

    scrollResetTimer.current = setTimeout(() => {
      setIsScrolling(false);
    }, resetDelay);
  }, [resetDelay]);

  useEffect(() => {
    return () => {
      if (scrollResetTimer.current) {
        clearTimeout(scrollResetTimer.current);
      }
    };
  }, []);

  const scrollPressGuardProps = useMemo(
    () => ({
      delaysContentTouches: false,
      canCancelContentTouches: true,
      onScrollBeginDrag: markScrolling,
      onMomentumScrollBegin: markScrolling,
      onScrollEndDrag: markScrollEnded,
      onMomentumScrollEnd: markScrollEnded,
    }),
    [markScrollEnded, markScrolling],
  );

  const guardPress = useCallback(
    (handler) => (...args) => {
      if (!isScrolling) {
        handler?.(...args);
      }
    },
    [isScrolling],
  );

  return { isScrolling, scrollPressGuardProps, guardPress };
}
