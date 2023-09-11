import { useSudokuContext } from "@/context/sudokuContext";
import { MouseEventHandler, useState } from "react";

type Props = {
  value: string;
};

export default function SudokuCell({ value }: Props) {
  const { selectedNumber } = useSudokuContext();
  console.log(selectedNumber);
  const [cellValue, setCellValue] = useState(value);

  const handleCellClick = (_e: any) => {
    console.log(selectedNumber);
    setCellValue(selectedNumber);
  };

  {
    console.log(value);
  }

  return (
    <button
      className="flex justify-center items-center  border border-slate-500 aspect-square"
      disabled={value != "-"}
      onClick={handleCellClick}
    >
      {cellValue}
    </button>
  );
}
