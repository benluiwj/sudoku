import { serialiseSudoku } from "@/app/utils"
import { SAVE_PUZZLE_TOASTER_MSG, SUDOKU_TABLE } from "@/app/utils/constants"
import { useSudokuContext } from "@/context/sudokuContext"
import { supabase } from "@/supbase"
import toast from "react-hot-toast"

export default function SavePuzzleButton() {
  const { gameTemplate, solution, difficulty } = useSudokuContext()

  const savePuzzle = () => {
    // serialize the solution and gameTemplate first
    const seralisedGame = serialiseSudoku(gameTemplate)
    const serialisedSolution = serialiseSudoku(solution)
    const uploadPuzzle = async () =>
      await supabase.from(SUDOKU_TABLE).insert({
        puzzle: seralisedGame,
        solution: serialisedSolution,
        difficulty,
      })
    toast.promise(uploadPuzzle(), {
      loading: SAVE_PUZZLE_TOASTER_MSG.LOADING,
      success: SAVE_PUZZLE_TOASTER_MSG.SUCCESS,
      error: SAVE_PUZZLE_TOASTER_MSG.ERROR,
    })
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => savePuzzle()}
    >
      {"Save Puzzle"}
    </button>
  )
}
