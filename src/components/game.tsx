import { getSudoku } from "sudoku-gen";

export const SudokuGame = () => {
  const sudoku = getSudoku();

  return (
    <div className="container m-auto mt-16 w-1/2">
      <div className="grid grid-cols-9">
        {sudoku.puzzle.split("").map((val, i) => (
          <div
            className="flex justify-center items-center border"
            key={i}
            style={{ aspectRatio: "1/1" }}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
};
