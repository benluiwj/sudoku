import { sudokuValueArray } from "@/app/utils/constants";
import { useSudokuContext } from "@/context/sudokuContext";

// STYLES

const defaultClassName =
  "flex justify-center items-center border border-slate-500 aspect-square rounded";
const selectedClassName = defaultClassName + " " + "bg-sky-500";

export default function InputButtons() {
  const { handleSelectedNumberChange, selectedNumber } = useSudokuContext();
  return (
    <div className="container m-auto mt-16 w-1/2">
      <div className="grid gap-4 grid-cols-9">
        {sudokuValueArray.map((value, i) => (
          <button
            className={
              selectedNumber === value ? selectedClassName : defaultClassName
            }
            key={i}
            onClick={() => handleSelectedNumberChange(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
