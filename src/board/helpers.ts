/**
 * find row for a number
 */
export function rowNumber(numb: number, columns: number) {
  return numb <= columns ? 1 : Math.ceil(numb / columns);
}

/**
 * generate possible vertical wins
 * @param rows
 * @param columns
 * @returns
 */
export function possibleVerticalWins(rows: number, columns: number) {
  const _rows = Array.from(Array(rows).keys());
  return Array.from(Array(columns).keys()).map((ci) =>
    _rows.map((ri) => ri * columns + 1 + ci)
  );
}

/**
 * generate possible vertical wins
 * @param rows
 * @param columns
 * @returns
 */
export function possibleHorizontalWins(rows: number, columns: number) {
  const _cols = Array.from(Array(columns).keys());
  return Array.from(Array(rows).keys()).map((ri) =>
    _cols.map((ci) => columns * ri + ci + 1)
  );
}

/**
 * generate possible diagonal wins leaning to the right
 * @param rows
 * @param columns
 * @returns
 */
export function possibleDiagonalToRightWins(rows: number, columns: number) {
  // get the number of win starting numbers on row or column
  // iterate on them to generate their their diagonal pairs
  const noOfWins = Math.abs(rows - columns) + 1;
  const winStarts =
    rows <= columns
      ? Array.from(Array(noOfWins).keys()).map((ci) => ci + 1)
      : Array.from(Array(noOfWins).keys()).map((ci) => ci * columns + 1);

  const iterations = Array.from(Array(Math.min(rows, columns)).keys());
  return winStarts.map((ci) => iterations.map((i) => ci + i * (columns + 1)));
}

/**
 * generate possible diagonal wins leaning to the left
 * @param rows
 * @param columns
 * @returns
 */
export function possibleDiagonalToLeftWins(rows: number, columns: number) {
  // get the number of win starting numbers on row or column
  // iterate on them to generate their their diagonal pairs
  const noOfWins = Math.abs(rows - columns) + 1;
  const winStarts =
    rows <= columns
      ? Array.from(Array(noOfWins).keys()).map((ci) => columns - ci)
      : Array.from(Array(noOfWins).keys()).map((ci) => columns * (ci + 1));

  const iterations = Array.from(Array(Math.min(rows, columns)).keys());
  return winStarts.map((ci) => iterations.map((i) => ci + (columns - 1) * i));
}

/**
 * check if a possible win content exists in a play array
 * @param possibleWin
 * @param plays
 * @returns
 */
export const compareWin = (possibleWin: number[], plays: number[]) =>
  possibleWin.every((v) => plays.includes(v));

/**
 * check possible win for 3 numbers.
 * @param possibleWins
 * @param hitsUnsorted
 * @returns
 */
export function winCheck(
  possibleWins: number[][],
  hitsUnsorted: number[]
): boolean {
  return (
    possibleWins.find((pw) => compareWin(pw, hitsUnsorted) === true) != null
  );
}
