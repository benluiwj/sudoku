import { convertFirstLetterToUpper } from "@/app/utils";
import { SUDOKU_DIFFICULTY_ARRAY } from "@/app/utils/constants";
import { useSudokuContext } from "@/context/sudokuContext";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

// Constants
// -----------------------------

const BUTTON_TEXT = "New Game";
const MODAL_TITLE = "Select a difficulty below:";
const MODAL_CLOSE_BUTTON_TEXT = "Done";

// --------------------------------

// Styles
// --------------------------------

const defaultButtonClassName =
  "bg-blue-500 text-white font-bold py-2 px-4 rounded";
const selectedButtonClassName = defaultButtonClassName + " " + "bg-sky-500";

// --------------------------------

export default function NewGameButton() {
  const { createNewSudokuGameWithDifficulty } = useSudokuContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const closeModal = () => {
    createNewSudokuGameWithDifficulty(selectedDifficulty);
    setIsOpen(false);
  };

  const openModal = () => {
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
                    {MODAL_TITLE}
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="flex m-auto mt-6 justify-evenly">
                      {SUDOKU_DIFFICULTY_ARRAY.map((value, i) => (
                        <button
                          className={
                            selectedDifficulty == value
                              ? selectedButtonClassName
                              : defaultButtonClassName
                          }
                          onClick={() => setSelectedDifficulty(value)}
                          key={i}
                        >
                          {convertFirstLetterToUpper(value)}
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
                      {MODAL_CLOSE_BUTTON_TEXT}
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
