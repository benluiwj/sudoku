import { sudokuValueArray } from "@/constants";

export default function InputButtons() {
  return (
    <div className="container m-auto mt-16 w-1/2">
      <div className="grid gap-4 grid-cols-9">
        {sudokuValueArray.map((value, i) => (
          <button
            className="flex justify-center items-center  border border-slate-500 aspect-square rounded"
            key={i}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}
