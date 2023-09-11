import LoadPuzzleButton from "./loadPuzzleButton";
import NewGameButton from "./newGameButton";
import SavePuzzleButton from "./savePuzzleButton";

export default function Header() {
  return (
    <div className="flex m-auto mt-16 w-1/3 justify-evenly">
      <LoadPuzzleButton />
      <SavePuzzleButton />
      <NewGameButton />
    </div>
  );
}
