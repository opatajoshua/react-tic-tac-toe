import difference from 'lodash/difference'
/**
 * find row for a number
 */
export function rowNumber(numb: number, columns: number) {
  return numb <= columns ? 1 : Math.ceil(numb / columns)
}

/**
 * generate possible vertical wins
 * @param rows
 * @param columns
 * @returns
 */
export function possibleVerticalWins(rows: number, columns: number) {
  const _rows = Array.from(Array(rows).keys())
  return Array.from(Array(columns).keys()).map((ci) => _rows.map((ri) => ri * columns + 1 + ci))
}

/**
 * generate possible vertical wins
 * @param rows
 * @param columns
 * @returns
 */
export function possibleHorizontalWins(rows: number, columns: number) {
  const _cols = Array.from(Array(columns).keys())
  return Array.from(Array(rows).keys()).map((ri) => _cols.map((ci) => columns * ri + ci + 1))
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
  const noOfWins = Math.abs(rows - columns) + 1
  const winStarts =
    rows <= columns
      ? Array.from(Array(noOfWins).keys()).map((ci) => ci + 1)
      : Array.from(Array(noOfWins).keys()).map((ci) => ci * columns + 1)

  const iterations = Array.from(Array(Math.min(rows, columns)).keys())
  return winStarts.map((ci) => iterations.map((i) => ci + i * (columns + 1)))
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
  const noOfWins = Math.abs(rows - columns) + 1
  const winStarts =
    rows <= columns
      ? Array.from(Array(noOfWins).keys()).map((ci) => columns - ci)
      : Array.from(Array(noOfWins).keys()).map((ci) => columns * (ci + 1))

  const iterations = Array.from(Array(Math.min(rows, columns)).keys())
  return winStarts.map((ci) => iterations.map((i) => ci + (columns - 1) * i))
}

/**
 * check if a possible win content exists in a play array
 * @param possibleWin
 * @param plays
 * @returns
 */
export const compareWin = (possibleWin: number[], plays: number[]) =>
  possibleWin.every((v) => plays.includes(v))

/**
 * check possible win for 3 numbers.
 * @param possibleWins
 * @param hitsUnsorted
 * @returns
 */
export function winCheck(possibleWins: number[][], hitsUnsorted: number[]): boolean {
  return possibleWins.find((pw) => compareWin(pw, hitsUnsorted) === true) != null
}

/**
 * get the next from for an computer play
 * @param possibleWins
 * @param humanPlays
 * @param androidPlays
 * @returns
 */
export function computerMove(
  possibleWins: number[][],
  humanPlays: number[],
  computerPlays: number[],
  rows: number,
  columns: number,
): Promise<number> {
  return new Promise((resolve) => {
    const minExpectedPlayForWin = Math.min(rows, columns)
    const remainingPlays = difference(Array.from(Array((rows * columns)-1).keys()).map(i=>i+1), [
      ...humanPlays,
      ...computerPlays,
    ])

    // defensive
    if (humanPlays.length >= Math.ceil(minExpectedPlayForWin / 2)) {
      // only possible wins computer didnt destroy
      const _possibleWins = possibleWins.filter(
        (p) => difference(p, computerPlays).length === p.length,
      )
      const predictHumanMove = _possibleWins.sort(
        (a, b) => difference(humanPlays, a).length - difference(humanPlays, b).length,
      )[0]
      if (predictHumanMove) {
        const remainingHumanMoves = difference(predictHumanMove, humanPlays)
        const chosenMove = remainingHumanMoves[randomIntFromInterval(0, remainingHumanMoves.length - 1)];
        resolve(chosenMove)
        // console.log('defensive', {
        //   humanPlays,
        //   computerPlays,
        //   predictHumanMove,
        //   remainingHumanMoves,
        //   _possibleWins,
        //   chosenMove
        // })
        return
      }
    }
    // offensive
    if (computerPlays.length) {
      // only possible wins human didnt destroy
      const _possibleWins = possibleWins.filter(
        (p) => difference(p, humanPlays).length === p.length,
      )
      const predictMyMove = _possibleWins.sort(
        (a, b) => difference(computerPlays, a).length - difference(computerPlays, b).length,
      )[0]
      if (predictMyMove) {
        const myRemainingMoves = difference(predictMyMove, computerPlays)
        resolve(myRemainingMoves[randomIntFromInterval(0, myRemainingMoves.length - 1)])
        // console.log('offensive', {
        //   humanPlays,
        //   predictMyMove,
        //   myRemainingMoves,
        //   _possibleWins,
        // })
        return
      }
    }
    // random
    // console.log('random', {remainingPlays})
    resolve(remainingPlays[randomIntFromInterval(0, remainingPlays.length)])
  })
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
