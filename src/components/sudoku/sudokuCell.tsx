import { isSelectedCellEqualCurrentCell } from "@/app/utils";
import { SUDOKU_VALUE, outOfBoundsCell } from "@/app/utils/constants";
import { useSudokuContext } from "@/context/sudokuContext";
import { useEffect, useState } from "react";

type Props = {
  value: string;
  rowPosition: number;
  colPosition: number;
};

const defaultBorder = "border border-slate-500 ";
const selectedBorder = "border-8 border-blue-700";
const invalidValue = "bg-red-300";
const defaultClassName = "flex justify-center items-center aspect-square ";

export default function SudokuCell({ value, rowPosition, colPosition }: Props) {
  const {
    selectedNumber,
    selectedCell,
    handleSelectedCellChange,
    handleSelectedNumberChange,
    updateGame,
    validateCellValue,
    game,
    isCellModifiable,
  } = useSudokuContext();

  const [cellValue, setCellValue] = useState(value);
  const [isValid, setIsValid] = useState(true);
  const currentCell = [rowPosition, colPosition];

  // effect to update current cell value that updates the entire game context
  useEffect(() => {
    if (isSelectedCellEqualCurrentCell(selectedCell, currentCell)) {
      setCellValue(selectedNumber);
      updateGame(selectedNumber, currentCell);
    }
  }, [selectedNumber]);

  // effect to update/reset value of the cell
  // when the game is loaded from the db/created fresh,
  // we need to capture the new value here
  useEffect(() => {
    setCellValue(value);
    setIsValid(true);
  }, [game]);

  // effect to check validity when game changes, result of the cell update
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
      disabled={isCellModifiable(currentCell)}
      onClick={handleCellClick}
    >
      {cellValue}
    </button>
  );
}
