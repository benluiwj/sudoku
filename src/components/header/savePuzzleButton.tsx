const BUTTON_TEXT = "Save Puzzle";

export default function SavePuzzleButton() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {BUTTON_TEXT}
    </button>
  );
}
