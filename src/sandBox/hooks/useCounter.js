import { useCallback, useState } from "react";

export default function useCounter(initialValue = 0, gaps = 0) {
  const [counter, setCounter] = useState(initialValue);

  const increment = useCallback(() => {
    setCounter((prev) => prev + gaps);
  }, [gaps]);

  const decrement = useCallback(() => {
    setCounter((prev) => prev - gaps);
  }, [gaps]);

  const reset = useCallback(() => {
    setCounter(initialValue);
  }, [initialValue]);

  return { counter, increment, decrement, reset };
}
