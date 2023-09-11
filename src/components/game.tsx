import { stringToMultiDimensionArray } from "@/app/utils";
import { useSudokuContext } from "@/context/sudokuContext";

export default function SudokuGame() {
  const { game } = useSudokuContext();

  const gameArray: string[][] = stringToMultiDimensionArray(game);

  return (
    <div className="container m-auto mt-16 w-1/2">
      <div className="grid grid-cols-3">
        {gameArray.map((val) => (
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
