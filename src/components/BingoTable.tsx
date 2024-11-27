import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function BingoTable({
  numbers = [],
}: {
  numbers?: number[] | string;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const parseNumbers = () => {
    if (typeof numbers === "string") {
      return numbers.split("").map((num: any) => parseInt(num, 10));
    }
    return numbers;
  };

  const bingoLetters = ["B", "I", "N", "G", "O"];
  const parsedNumbers = parseNumbers();
  const bingoNumbers = [
    ...parsedNumbers,
    ...Array(25 - parsedNumbers.length).fill(""),
  ].slice(0, 25);

  const rows = Array.from({ length: 5 }, (_, i) =>
    bingoNumbers.slice(i * 5, i * 5 + 5)
  );

  const toggleSelection = (key: string) => {
    setSelected((prevSelected) => {
      const newSet = new Set(prevSelected);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-md mx-auto overflow-hidden">
      <div className="grid grid-cols-5 gap-px bg-gray-200">
        {bingoLetters.map((letter) => (
          <div
            key={letter}
            className="bg-primary text-primary-foreground p-4 text-center font-bold text-xl"
          >
            {letter}
          </div>
        ))}
        {rows.map((row, rowIndex) =>
          row.map((num, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const isSelected = selected.has(key);

            return (
              <div
                key={key}
                onClick={() => toggleSelection(key)}
                className={`${
                  isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-card text-card-foreground"
                } p-4 text-center font-semibold text-lg aspect-square cursor-pointer flex items-center justify-center`}
              >
                {num}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
