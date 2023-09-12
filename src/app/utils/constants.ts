export enum SUDOKU_DIFFICULTY {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export enum SUDOKU_VALUE {
  NONE = "NONE",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
}

export const sudokuValueArray: SUDOKU_VALUE[] = [
  SUDOKU_VALUE.ONE,
  SUDOKU_VALUE.TWO,
  SUDOKU_VALUE.THREE,
  SUDOKU_VALUE.FOUR,
  SUDOKU_VALUE.FIVE,
  SUDOKU_VALUE.SIX,
  SUDOKU_VALUE.SEVEN,
  SUDOKU_VALUE.EIGHT,
  SUDOKU_VALUE.NINE,
];

export const outOfBoundsCell = [-1, -1];

export const SUDOKU_TABLE = "sudoku_puzzles";

export enum SAVE_PUZZLE_TOASTER_MSG {
  SUCCESS = "Puzzle saved!",
  LOADING = "Saving puzzle...",
  ERROR = "Something went wrong."
}