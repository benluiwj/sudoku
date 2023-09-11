const BUTTON_TEXT = "Load Puzzle";

export default function LoadPuzzleButton() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {BUTTON_TEXT}
    </button>
  );
}
