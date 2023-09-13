export function deserialiseSudoku(s: string): string[][] {
  return s.split("").reduce<string[][]>((acc, char, index) => {
    if (index % 9 === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(char);
    return acc;
  }, []);
}

export function serialiseSudoku(array: string[][]): string {
  return array.map((row) => row.join("")).join("");
}

export function isSelectedCellEqualCurrentCell(
  selected: number[],
  current: number[]
) {
  return selected[0] == current[0] && selected[1] == current[1];
}

export function convertFirstLetterToUpper(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function isGameSolved(current: string[][], solution: string[][]) {
  // check for length because current would be [] one first load,
  // making the condition false
  return (
    current.length && serialiseSudoku(current) === serialiseSudoku(solution)
  );
}
