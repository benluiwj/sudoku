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
import { deserialiseSudoku } from "@/app/utils";
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
  gameTemplate: string[][];
  handleSelectedNumberChange: (_: string) => void;
  handleSelectedCellChange: (_: number[]) => void;
  updateGame: (newValue: string, cell: number[]) => void;
  validateCellValue: (cell: number[]) => boolean;
  isCellModifiable: (cell: number[]) => boolean;
  loadGame: (game: string[][]) => void;
  loadSolution: (solution: string[][]) => void;
  loadDifficulty: (difficulty: string) => void;
  setGameWon: () => void;
};

const defaultSudokuContext = {
  selectedNumber: SUDOKU_VALUE.NONE,
  selectedCell: outOfBoundsCell,
  isWon: false,
  difficulty: SUDOKU_DIFFICULTY.EASY,
  solution: [],
  game: [],
  gameTemplate: [],
  handleSelectedNumberChange: () => {},
  handleSelectedCellChange: () => {},
  updateGame: () => {},
  validateCellValue: () => true,
  isCellModifiable: () => true,
  loadGame: () => {},
  loadSolution: () => {},
  loadDifficulty: () => {},
  setGameWon: () => {},
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

    const deserialisedSudoku = deserialiseSudoku(game);
    setGame(deserialisedSudoku);
    setSolution(deserialiseSudoku(solution));
    setDifficulty(difficulty);
    setGameTemplate(deserialisedSudoku);
  }, []);

  const handleSelectedCellChange = useCallback((cell: number[]) => {
    setSelectedCell(cell);
  }, []);

  const handleSelectedNumberChange = useCallback((number: string) => {
    setSelectedNumber(number);
  }, []);

  const loadGame = useCallback((newGame: string[][]) => {
    setGame(newGame);
    setGameTemplate(newGame);
  }, []);

  const loadSolution = useCallback((newSolution: string[][]) => {
    setSolution(newSolution);
  }, []);

  const loadDifficulty = useCallback((difficulty: string) => {
    setDifficulty(difficulty);
  }, []);

  const updateGame = useCallback(
    (newValue: string, cell: number[]) => {
      setGame((draft) => {
        const [rowIndex, colIndex] = cell;
        // adapted from https://stackoverflow.com/questions/5269064/sudoku-find-current-square-based-on-row-column
        const index = Math.floor(colIndex / 9 + rowIndex);

        // Update the value in the corresponding cell within the square
        draft[index][colIndex] = newValue;
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

  const setGameWon = useCallback(() => {
    setIsWon(true);
  }, []);

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
      gameTemplate,
      loadGame,
      loadSolution,
      loadDifficulty,
      setGameWon,
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
      gameTemplate,
      loadGame,
      loadSolution,
      loadDifficulty,
      setGameWon,
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
