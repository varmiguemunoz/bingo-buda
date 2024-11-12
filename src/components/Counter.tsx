/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter: any) => {
        if (prevCounter >= 60) {
          clearInterval(interval);
          return prevCounter;
        }
        return prevCounter + 1;
      });
    }, 1000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-12">
      <span className="text-5xl font-bold">{counter}</span>
    </div>
  );
}
