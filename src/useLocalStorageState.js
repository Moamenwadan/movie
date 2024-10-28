import { useEffect, useState } from "react";
export function useLocalStorageState(key) {
  const [value, setValue] = useState(function () {
    const storage = localStorage.getItem(key);
    return JSON.parse(storage) || [];
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, setValue, key]
  );
  return [value, setValue];
}
