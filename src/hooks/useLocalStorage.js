import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch {
      return initialValue;
    }
  });

  function updateValue(nextValue) {
    setValue((current) => {
      const valueToStore = typeof nextValue === "function" ? nextValue(current) : nextValue;
      try {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch {
        // Storage may be unavailable; keep the in-memory value.
      }
      return valueToStore;
    });
  }

  return [value, updateValue];
}