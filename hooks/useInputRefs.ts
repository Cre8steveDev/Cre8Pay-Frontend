/**
 * Input Refs Hook for setting multiple refs
 * allowing for focusing on next input element
 * @param count
 * @returns
 */

import { useCallback, useRef } from "react";
import { TextInput } from "react-native";

function useInputRefs(count: number) {
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const setRef = useCallback(
    (index: number) => (el: TextInput | null) => {
      inputRefs.current[index] = el;
    },
    []
  );

  const focusNext = useCallback(
    (index: number) => {
      if (index < count - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [count]
  );

  return { setRef, focusNext };
}

export default useInputRefs;
