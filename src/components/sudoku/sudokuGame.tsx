import { useSudokuContext } from "@/context/sudokuContext";
import SudokuCell from "./sudokuCell";
import { Dialog, Transition } from "@headlessui/react";

import { useEffect, useState, Fragment } from "react";
import { isGameSolved } from "@/app/utils";

export default function SudokuGame() {
  const { game, solution, setGameWon, isWon } = useSudokuContext();
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isGameSolved(game, solution)) {
      setGameWon();
      setIsOpen(true);
    }
  }, [game]);

  return (
    <>
      <div className="container m-auto mt-16 w-1/2">
        <div className="grid grid-cols-3">
          {game.map((val, i) => (
            <div key={i} className="grid grid-cols-3 border border-white">
              {val.map((cellVal, j) => (
                <SudokuCell
                  key={j}
                  value={cellVal}
                  rowPosition={i}
                  colPosition={j}
                />
              ))}
            </div>
          ))}
        </div>
        <Transition appear show={isWon} as={Fragment}>
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
                      Congratulations! You won!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Save this puzzle, load one or try another!
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}
