"use client";

import SudokuGame from "@/components/sudokuGame";
import InputButtons from "@/components/inputButtons";
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
