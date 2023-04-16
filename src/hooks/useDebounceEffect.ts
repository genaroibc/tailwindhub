import { DependencyList, useEffect } from "react";

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps: DependencyList
) {
  useEffect(() => {
    const t = setTimeout(() => {
      // @ts-ignore
      fn.apply(undefined, deps);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
