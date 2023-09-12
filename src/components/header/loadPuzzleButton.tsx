import { deserialiseSudoku } from "@/app/utils";
import { SUDOKU_DIFFICULTY_ARRAY, SUDOKU_TABLE } from "@/app/utils/constants";
import { useSudokuContext } from "@/context/sudokuContext";
import { supabase } from "@/supbase";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { getSudoku } from "sudoku-gen";

// Constants and styles
// -----------------------------

const BUTTON_TEXT = "Load Puzzle";
const defaultButtonClassName =
  "bg-blue-500 text-white font-bold py-2 px-4 rounded";
const disabledButtonClassName = defaultButtonClassName + " " + "bg-slate-500";
const selectedButtonClassName = defaultButtonClassName + " " + "bg-sky-500";

// --------------------------------

export default function LoadPuzzleButton() {
  const { loadGame, loadSolution } = useSudokuContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [availableDifficulties, setAvailableDifficulties] = useState(new Set());

  const presentDifficulties = async () => {
    const difficulties = await supabase.from(SUDOKU_TABLE).select("difficulty");
    const difficultyArray = difficulties?.data ?? [];
    const values = difficultyArray.reduce((set, jsonObject: any) => {
      set.add(jsonObject.difficulty);
      return set;
    }, new Set());
    setAvailableDifficulties(values);
    return values;
  };

  const getGameFromDifficulty = async () => {
    const query = await supabase
      .from(SUDOKU_TABLE)
      .select()
      .eq("difficulty", selectedDifficulty);

    const games = query?.data ?? [];

    // just a precaution, shouldn't be the case
    if (games.length == 0) {
      const { puzzle, solution } = getSudoku();
      loadGame(deserialiseSudoku(puzzle));
      loadSolution(deserialiseSudoku(solution));
      return;
    }

    // pick a random game
    const { puzzle, solution } =
      games[Math.floor(Math.random() * games.length)];

    console.log(puzzle, solution);
    loadGame(deserialiseSudoku(puzzle));
    loadSolution(deserialiseSudoku(solution));
  };

  // closes the modal and gets a random puzzle
  const closeModal = async () => {
    setIsOpen(false);
    await getGameFromDifficulty();
  };

  const openModal = async () => {
    await presentDifficulties();
    setIsOpen(true);
  };
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        {BUTTON_TEXT}
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Select a difficulty below:
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flex m-auto mt-6 justify-evenly">
                      {SUDOKU_DIFFICULTY_ARRAY.map((value, i) => (
                        <button
                          className={
                            !availableDifficulties.has(value)
                              ? disabledButtonClassName
                              : selectedDifficulty == value
                              ? selectedButtonClassName
                              : defaultButtonClassName
                          }
                          onClick={() => setSelectedDifficulty(value)}
                          key={i}
                          disabled={!availableDifficulties.has(value)}
                        >
                          {value.charAt(0).toUpperCase() + value.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 "
                      onClick={closeModal}
                    >
                      Done
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
