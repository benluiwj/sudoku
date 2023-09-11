import { useSudokuContext } from "@/context/sudokuContext";
import SudokuCell from "./sudokuCell";

export default function SudokuGame() {
  const { game } = useSudokuContext();

  return (
    <div className="container m-auto mt-16 w-1/2">
      <div className="grid grid-cols-3">
        {game.map((val, i) => (
          <div key={i} className="grid grid-cols-3 border border-white">
            {val.map((cellVal, j) => (
              <SudokuCell
                key={j}
                value={cellVal}
                rowPosition={i}
                colPosition={j}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
