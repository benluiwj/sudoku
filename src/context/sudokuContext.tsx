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

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

type SudokuContextType = {
  selectedNumber: string;
  selectedCell: number[]; // x,y coordinate of cell
  isWon: boolean;
  difficulty: string;
  solution: string;
  game: string;
  handleSelectedNumberChange: (_: string) => void;
  handleSelectedCellChange: (_: number[]) => void;
};

const defaultSudokuContext = {
  selectedNumber: SUDOKU_VALUE.NONE,
  selectedCell: outOfBoundsCell,
  isWon: false,
  difficulty: SUDOKU_DIFFICULTY.EASY,
  solution: "",
  game: "",
  handleSelectedNumberChange: () => {},
  handleSelectedCellChange: () => {},
};

// ----------------------------------------------------------------------

export default function SudokuProvider({ children }: Props) {
  const [isWon, setIsWon] = useState<boolean>(false);
  const [game, setGame] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>(SUDOKU_DIFFICULTY.EASY);
  const [selectedNumber, setSelectedNumber] = useState<string>(
    SUDOKU_VALUE.NONE
  );
  const [selectedCell, setSelectedCell] = useState<number[]>(outOfBoundsCell);

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

  const handleSelectedCellChange = useCallback((cell: number[]) => {
    setSelectedCell(cell);
  }, []);

  const handleSelectedNumberChange = useCallback((number: string) => {
    setSelectedNumber(number);
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
