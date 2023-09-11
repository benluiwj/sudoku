"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  SUDOKU_DIFFICULTY,
  SUDOKU_VALUE,
  outOfBoundsCell,
} from "../app/utils/constants";
import { getSudoku } from "sudoku-gen";
import { serialiseSudoku } from "@/app/utils";
import { useImmer } from "use-immer";

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

type SudokuContextType = {
  selectedNumber: string;
  selectedCell: number[]; // x,y coordinate of cell
  isWon: boolean;
  difficulty: string;
  solution: string[][];
  game: string[][];
  handleSelectedNumberChange: (_: string) => void;
  handleSelectedCellChange: (_: number[]) => void;
  updateGame: (newValue: string, cell: number[]) => void;
  validateCellValue: (cell: number[]) => boolean;
  isCellModifiable: (cell: number[]) => boolean;
};

const defaultSudokuContext = {
  selectedNumber: SUDOKU_VALUE.NONE,
  selectedCell: outOfBoundsCell,
  isWon: false,
  difficulty: SUDOKU_DIFFICULTY.EASY,
  solution: [],
  game: [],
  handleSelectedNumberChange: () => {},
  handleSelectedCellChange: () => {},
  updateGame: () => {},
  validateCellValue: () => true,
  isCellModifiable: () => true,
};

// ----------------------------------------------------------------------

export default function SudokuProvider({ children }: Props) {
  const [isWon, setIsWon] = useState<boolean>(false);
  const [game, setGame] = useImmer<string[][]>([]);
  const [solution, setSolution] = useState<string[][]>([]);
  const [difficulty, setDifficulty] = useState<string>(SUDOKU_DIFFICULTY.EASY);
  const [selectedNumber, setSelectedNumber] = useState<string>(
    SUDOKU_VALUE.NONE
  );
  const [selectedCell, setSelectedCell] = useState<number[]>(outOfBoundsCell);
  const [gameTemplate, setGameTemplate] = useState<string[][]>([]);

  useEffect(() => {
    const {
      puzzle: game,
      solution,
      difficulty,
    } = getSudoku(SUDOKU_DIFFICULTY.EASY);
    const serialisedSudoku = serialiseSudoku(game);
    setGame(serialisedSudoku);
    setSolution(serialiseSudoku(solution));
    setDifficulty(difficulty);
    setGameTemplate(serialisedSudoku);
  }, []);

  const handleSelectedCellChange = useCallback((cell: number[]) => {
    setSelectedCell(cell);
  }, []);

  const handleSelectedNumberChange = useCallback((number: string) => {
    setSelectedNumber(number);
  }, []);

  const updateGame = useCallback(
    (newValue: string, cell: number[]) => {
      setGame((draft) => {
        const [rowIndex, colIndex] = cell;
        // adapted from https://stackoverflow.com/questions/5269064/sudoku-find-current-square-based-on-row-column
        const index = Math.floor(colIndex / 9 + rowIndex);

        // Update the value in the corresponding cell within the square
        draft[index][colIndex] = newValue;
        console.log(draft[index][colIndex]);
      });
    },
    [game]
  );

  const validateCellValue = useCallback(
    (cell: number[]) => {
      console.log(game);
      const [rowIndex, colIndex] = cell;
      return (
        game[Math.floor(colIndex / 9 + rowIndex)][colIndex] == "-" ||
        game[Math.floor(colIndex / 9 + rowIndex)][colIndex] ==
          solution[Math.floor(colIndex / 9 + rowIndex)][colIndex]
      );
    },
    [game]
  );

  const isCellModifiable = useCallback(
    (cell: number[]) => {
      const [rowIndex, colIndex] = cell;
      return gameTemplate[Math.floor(colIndex / 9 + rowIndex)][colIndex] != "-";
    },
    [gameTemplate]
  );

  const value = useMemo(
    () => ({
      isWon,
      game,
      solution,
      difficulty,
      selectedCell,
      selectedNumber,
      handleSelectedCellChange,
      handleSelectedNumberChange,
      validateCellValue,
      updateGame,
      isCellModifiable,
    }),
    [
      isWon,
      game,
      solution,
      difficulty,
      selectedCell,
      selectedNumber,
      handleSelectedCellChange,
      handleSelectedNumberChange,
      validateCellValue,
      updateGame,
      isCellModifiable,
    ]
  );

  return (
    <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>
  );
}

const SudokuContext = createContext<SudokuContextType>(defaultSudokuContext);

export function useSudokuContext() {
  return useContext(SudokuContext);
}
