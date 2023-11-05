import { sudokuValueArray } from "@/app/utils/constants"
import { useSudokuContext } from "@/context/sudokuContext"

// STYLES
const DEFAULT_BUTTON_STYLE =
  "flex justify-center items-center border border-slate-500 aspect-square rounded"
const SELECTED_BUTTON_STYLE = DEFAULT_BUTTON_STYLE + " " + "bg-sky-500"

export default function InputButtons() {
  const { handleSelectedNumberChange, selectedNumber } = useSudokuContext()
  return (
    <div className="container m-auto mt-16 w-1/2">
      <div className="grid gap-4 grid-cols-9">
        {sudokuValueArray.map((value, i) => (
          <button
            className={
              selectedNumber === value
                ? SELECTED_BUTTON_STYLE
                : DEFAULT_BUTTON_STYLE
            }
            key={i}
            onClick={() => handleSelectedNumberChange(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}
