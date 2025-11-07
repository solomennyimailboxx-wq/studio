import { LegacyRef, MutableRefObject, RefCallback, useMemo } from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * A utility hook for merging multiple refs into one.
 * Useful for component abstractions that need to both forward a ref
 * and use an internal ref.
 *
 * @param refs An array of refs to be combined.
 * @returns A single ref callback.
 */
export function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
  return useMemo(
    () => (node: T) => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as MutableRefObject<T>).current = node;
        }
      }
    },
    refs,
  );
}
