import { createContext, useContext, useEffect, useState } from "react";
import { SUDOKU_DIFFICULTY } from "../app/utils/constants";
import { getSudoku } from "sudoku-gen";

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

type SudokuContextType = {
  numberSelected: string;
  cellSelected: number;
  isWon: boolean;
  difficulty: string;
  solution: string;
  game: string;
};

const defaultSudokuContext = {
  numberSelected: "",
  cellSelected: 0,
  isWon: false,
  difficulty: SUDOKU_DIFFICULTY.EASY,
  solution: "",
  game: "",
};

// ----------------------------------------------------------------------

export default function SudokuProvider({ children }: Props) {
  const [isWon, setIsWon] = useState<boolean>(false);
  const [game, setGame] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>(SUDOKU_DIFFICULTY.EASY);
  const [numberSelected, setNumberSelected] = useState<string>("");
  const [cellSelected, setCellSelected] = useState<number>(0);

  useEffect(() => {
    const {
      puzzle: game,
      solution,
      difficulty,
    } = getSudoku(SUDOKU_DIFFICULTY.EASY);
    setGame(game);
    setSolution(solution);
    setDifficulty(difficulty);
  }, []);

  return (
    <SudokuContext.Provider
      value={{
        isWon,
        game,
        solution,
        difficulty,
        numberSelected,
        cellSelected,
      }}
    >
      {children}
    </SudokuContext.Provider>
  );
}

const SudokuContext = createContext<SudokuContextType>(defaultSudokuContext);

export function useSudokuContext() {
  return useContext(SudokuContext);
}
