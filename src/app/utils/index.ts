export function stringToMultiDimensionArray(s: string): string[][] {
  return s.split("").reduce<string[][]>((acc, char, index) => {
    if (index % 9 === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(char);
    return acc;
  }, []);
}

export function multiDimensionArrayToString(array: string[][]): string {
  return array.map((row) => row.join(" ")).join(" ");
}
