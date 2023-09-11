"use client";

import SudokuGame from "@/components/sudoku/sudokuGame";
import InputButtons from "@/components/sudoku/inputButtons";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <SudokuGame />
      <InputButtons />
    </>
  );
}
