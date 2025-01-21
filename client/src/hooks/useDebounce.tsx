import { useEffect, useState } from "react";

const useDebounce = (delay: number, value: string) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, value]);

  return debounceValue;
};

export default useDebounce;
