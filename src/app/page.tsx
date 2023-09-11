"use client";

import SudokuGame from "@/components/game";
import InputButtons from "@/components/inputButtons";
import SudokuProvider from "@/context/sudokuContext";

export default function Home() {
  return (
    <>
      <SudokuGame />
      <InputButtons />
    </>
  );
}
