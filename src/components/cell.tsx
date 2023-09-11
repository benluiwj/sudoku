import { isSelectedCellEqualCurrentCell } from "@/app/utils";
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
    game,
  } = useSudokuContext();
  const [cellValue, setCellValue] = useState(value);
  const currentCell = [rowPosition, colPosition];

  console.log(game);

  useEffect(() => {
    if (isSelectedCellEqualCurrentCell(selectedCell, currentCell)) {
      setCellValue(selectedNumber);
      handleSelectedCellChange(outOfBoundsCell);
      handleSelectedNumberChange(SUDOKU_VALUE.NONE);
    }
  }, [selectedNumber]);

  const handleCellClick = (_e: any) => {
    handleSelectedCellChange(currentCell);
  };

  return (
    <button
      className={
        defaultClassName +
        (isSelectedCellEqualCurrentCell(selectedCell, currentCell)
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
