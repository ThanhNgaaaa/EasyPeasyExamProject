/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value, delay);
  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);
    return ()=>clearTimeout(handler);
  }, [value]);
  return debounceValue;
};

export default useDebounce;
