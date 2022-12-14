import intersection from 'lodash/intersection'
import difference from 'lodash/difference'
import { StructureState } from './Board'
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
 * check possible win for played numbers.
 * @param possibleWins
 * @param hitsUnsorted
 * @returns
 */
export function winCheck(possibleWins: number[][], hitsUnsorted: number[]): boolean {
  return possibleWins.find((pw) => compareWin(pw, hitsUnsorted) === true) != null
}

/**
 * get the best number for computer to play
 * @param possibleWins
 * @param humanPlays
 * @param computerPlays
 * @returns
 */
export function computerMove(
  structureState: StructureState,
  humanPlays: number[],
  computerPlays: number[],
  rows: number,
  columns: number,
  showStrategyLogs = false,
  difficultyLevel: 'difficult' |'easy' = 'difficult'
): number {
  const { possibleWins, possibleDiagonalToLeftWins, possibleDiagonalToRightWins } = structureState
  const minExpectedPlayForWin = Math.min(rows, columns)
  const remainingPlays = difference(
    Array.from(Array(rows * columns).keys()).map((i) => i + 1),
    [...humanPlays, ...computerPlays],
  )

  // defensive
  let defensiveMoves: number[] = []
  if (humanPlays.length >= Math.ceil(minExpectedPlayForWin / 2) || !computerPlays.length) {
    // only possible wins computer didnt destroy
    const _possibleWins = (!computerPlays.length && difficultyLevel === 'difficult')
      ? [...possibleDiagonalToLeftWins, ...possibleDiagonalToRightWins]
      : possibleWins.filter((p) => difference(p, computerPlays).length === p.length)

    const predictedHumanMove = _possibleWins.sort(
      (a, b) =>
        // sort by percentages played to a possible win
        percentage(intersection(humanPlays, b).length, b.length) -
        percentage(intersection(humanPlays, a).length, a.length),
    )[0]

    if (predictedHumanMove) {
      defensiveMoves = difference(predictedHumanMove, humanPlays)
    }
  }

  // offensive
  let offensiveMoves: number[] = []
  if (computerPlays.length) {
    // only possible wins human didnt destroy
    const _possibleWins = possibleWins.filter((p) => difference(p, humanPlays).length === p.length)
    const predictMyMove = _possibleWins.sort(
      (a, b) => difference(computerPlays, a).length - difference(computerPlays, b).length,
    )[0]
    if (predictMyMove) {
      offensiveMoves = difference(predictMyMove, computerPlays)
    }
  }

  if (defensiveMoves.length || offensiveMoves.length) {
    const moves =
      (defensiveMoves.length && defensiveMoves.length < offensiveMoves.length) ||
      !offensiveMoves.length
        ? defensiveMoves
        : offensiveMoves
    const bestMove = moves[randomIntFromInterval(0, moves.length - 1)]

    if (bestMove) {
      if (showStrategyLogs)
        console.log(
          defensiveMoves.length && defensiveMoves.length < offensiveMoves.length
            ? 'defensive'
            : 'offensive',
          // { defensiveMoves, offensiveMoves },
        )
      return bestMove
    }
  }

  // random
  // TODO: on difficult level, random should not be a corner
  const randomIndex = randomIntFromInterval(0, remainingPlays.length - 1)
  if (showStrategyLogs) console.log('random')
  return remainingPlays[randomIndex]
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function percentage(partialValue: number, totalValue: number) {
  return (100 * partialValue) / totalValue
}
