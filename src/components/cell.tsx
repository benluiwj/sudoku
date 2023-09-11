import { isSelectedCellEqualCurrentCell } from "@/app/utils";
import { SUDOKU_VALUE, outOfBoundsCell } from "@/app/utils/constants";
import { useSudokuContext } from "@/context/sudokuContext";
import { MouseEventHandler, useEffect, useState } from "react";

type Props = {
  value: string;
  rowPosition: number;
  colPosition: number;
  initialValue: string;
};

const defaultBorder = "border border-slate-500 ";
const selectedBorder = "border-8 border-blue-700";
const invalidValue = "bg-red-300";
const defaultClassName = "flex justify-center items-center aspect-square ";

export default function SudokuCell({
  value,
  rowPosition,
  colPosition,
  initialValue,
}: Props) {
  const {
    selectedNumber,
    selectedCell,
    handleSelectedCellChange,
    handleSelectedNumberChange,
    updateGame,
    validateCellValue,
    game,
  } = useSudokuContext();

  const [cellValue, setCellValue] = useState(value);
  const [isValid, setIsValid] = useState(true);
  const currentCell = [rowPosition, colPosition];

  useEffect(() => {
    if (isSelectedCellEqualCurrentCell(selectedCell, currentCell)) {
      setCellValue(selectedNumber);
      updateGame(selectedNumber, currentCell);
    }
  }, [selectedNumber]);

  useEffect(() => {
    if (isSelectedCellEqualCurrentCell(selectedCell, currentCell)) {
      setIsValid(validateCellValue(selectedCell));
      handleSelectedCellChange(outOfBoundsCell);
      handleSelectedNumberChange(SUDOKU_VALUE.NONE);
    }
  }, [game]);

  const handleCellClick = (_e: any) => {
    handleSelectedCellChange(currentCell);
  };

  return (
    <button
      className={
        isValid
          ? defaultClassName +
            (isSelectedCellEqualCurrentCell(selectedCell, currentCell)
              ? selectedBorder
              : defaultBorder)
          : defaultClassName + invalidValue
      }
      disabled={initialValue != "-"}
      onClick={handleCellClick}
    >
      {cellValue}
    </button>
  );
}
