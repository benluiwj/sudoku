import { SUDOKU_VALUE, outOfBoundsCell } from "@/app/utils/constants";
import { useSudokuContext } from "@/context/sudokuContext";
import { MouseEventHandler, useEffect, useState } from "react";

type Props = {
  value: string;
  rowPosition: number;
  colPosition: number;
};

const defaultBorder = "border border-slate-500 ";
const selectedBorder = "border-8 border-blue-700";
const defaultClassName = "flex justify-center items-center aspect-square ";

export default function SudokuCell({ value, rowPosition, colPosition }: Props) {
  const {
    selectedNumber,
    selectedCell,
    handleSelectedCellChange,
    handleSelectedNumberChange,
  } = useSudokuContext();
  const [cellValue, setCellValue] = useState(value);
  const positionArray = [rowPosition, colPosition];

  useEffect(() => {
    if (selectedCell[0] == rowPosition && selectedCell[1] == colPosition) {
      setCellValue(selectedNumber);
      handleSelectedCellChange(outOfBoundsCell);
      handleSelectedNumberChange(SUDOKU_VALUE.NONE);
    }
  }, [selectedNumber]);

  const handleCellClick = (_e: any) => {
    console.log(selectedNumber);
    handleSelectedCellChange(positionArray);
  };

  return (
    <button
      className={
        defaultClassName +
        (selectedCell[0] == rowPosition && selectedCell[1] == colPosition
          ? selectedBorder
          : defaultBorder)
      }
      disabled={value != "-"}
      onClick={handleCellClick}
    >
      {cellValue}
    </button>
  );
}
