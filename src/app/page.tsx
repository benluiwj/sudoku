"use client";

import SudokuGame from "@/components/sudoku/sudokuGame";
import InputButtons from "@/components/sudoku/inputButtons";
import Header from "@/components/header";
import SudokuProvider from "@/context/sudokuContext";

export default function Home() {
  return (
    <SudokuProvider>
      <Header />
      <SudokuGame />
      <InputButtons />
    </SudokuProvider>
  );
}
