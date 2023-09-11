import { getSudoku } from "sudoku-gen";

export default function SudokuGame() {
  const sudoku = getSudoku();

  const arrayOfArrays: string[][] = sudoku.puzzle
    .split("")
    .reduce<string[][]>((acc, char, index) => {
      if (index % 9 === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(char);
      return acc;
    }, []);

  return (
    <div className="container m-auto mt-16 w-1/2">
      <div className="grid grid-cols-3">
        {arrayOfArrays.map((val, i) => (
          <div className="grid grid-cols-3 border border-white">
            {val.map((cellVal, j) => (
              <div
                className="flex justify-center items-center  border border-slate-500 aspect-square"
                key={j}
              >
                {cellVal == "-" ? "" : cellVal}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
