import {
  compareWin,
  computerMove,
  possibleDiagonalToLeftWins,
  possibleDiagonalToRightWins,
  possibleHorizontalWins,
  possibleVerticalWins,
  rowNumber,
  winCheck,
} from './helpers'

it('rowNumber return correct value', () => {
  const columns = 3
  expect(rowNumber(1, columns)).toStrictEqual(1)
  expect(rowNumber(3, columns)).toStrictEqual(1)
  expect(rowNumber(4, columns)).toStrictEqual(2)
  expect(rowNumber(5, columns)).toStrictEqual(2)
  expect(rowNumber(7, columns)).toStrictEqual(3)
  expect(rowNumber(9, columns)).toStrictEqual(3)
})

it('possibleVerticalWins returns all expected wins', () => {
  expect(new Set(possibleVerticalWins(3, 3))).toEqual(
    new Set([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]),
  )
  expect(new Set(possibleVerticalWins(3, 4))).toEqual(
    new Set([
      [1, 5, 9],
      [2, 6, 10],
      [3, 7, 11],
      [4, 8, 12],
    ]),
  )
  expect(new Set(possibleVerticalWins(5, 2))).toEqual(
    new Set([
      [1, 3, 5, 7, 9],
      [2, 4, 6, 8, 10],
    ]),
  )

  // should be complete wins
  expect(new Set(possibleVerticalWins(5, 2))).not.toEqual(
    new Set([
      [1, 3, 5, 7, 9],
      [2, 4, 6, 8, 9],
    ]),
  )
})

it('possibleHorizontalWins returns all expected wins', () => {
  expect(new Set(possibleHorizontalWins(3, 3))).toEqual(
    new Set([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]),
  )

  expect(new Set(possibleHorizontalWins(3, 4))).toEqual(
    new Set([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ]),
  )

  expect(new Set(possibleHorizontalWins(5, 3))).toEqual(
    new Set([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
      [13, 14, 15],
    ]),
  )

  // should be complete wins
  expect(new Set(possibleHorizontalWins(5, 3))).not.toEqual(
    new Set([
      [1, 2, 3],
      [4, 5, 6],
    ]),
  )
})

it('possibleDiagonalToLeftWins returns all expected wins', () => {
  expect(new Set(possibleDiagonalToLeftWins(3, 3))).toEqual(new Set([[3, 5, 7]]))

  expect(new Set(possibleDiagonalToLeftWins(3, 4))).toEqual(
    new Set([
      [4, 7, 10],
      [3, 6, 9],
    ]),
  )

  expect(new Set(possibleDiagonalToLeftWins(5, 3))).toEqual(
    new Set([
      [3, 5, 7],
      [6, 8, 10],
      [9, 11, 13],
    ]),
  )

  // should be complete wins
  expect(new Set(possibleDiagonalToLeftWins(5, 3))).not.toEqual(
    new Set([
      [3, 5, 7],
      [6, 8, 10],
    ]),
  )
})

it('possibleDiagonalToRightWins returns all expected wins', () => {
  expect(new Set(possibleDiagonalToRightWins(3, 3))).toEqual(new Set([[1, 5, 9]]))

  expect(new Set(possibleDiagonalToRightWins(3, 4))).toEqual(
    new Set([
      [1, 6, 11],
      [2, 7, 12],
    ]),
  )

  expect(new Set(possibleDiagonalToRightWins(5, 3))).toEqual(
    new Set([
      [1, 5, 9],
      [4, 8, 12],
      [7, 11, 15],
    ]),
  )

  // should be complete wins
  expect(new Set(possibleDiagonalToRightWins(5, 3))).not.toEqual(
    new Set([
      [1, 5, 9],
      [4, 8, 12],
    ]),
  )
})

it('compareWin matches array items as expected', () => {
  expect(compareWin([4, 8, 12], [9, 4, 8, 12])).toStrictEqual(true)
  expect(compareWin([4, 8, 7], [9, 4, 8, 12])).toStrictEqual(false)
})

it('winCheck finds the correct match of plays from possible wins', () => {
  const possibleWins = [
    [1, 5, 9],
    [4, 8, 12],
    [7, 11, 15],
  ]
  expect(winCheck(possibleWins, [9, 1, 8, 5])).toStrictEqual(true)
  expect(winCheck(possibleWins, [9, 1, 8, 12])).toStrictEqual(false)
})

it('computer play works', () => {
  // expecting a defensive play
  const bestMove = computerMove(
    [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25, 26, 27],
      [1, 10, 19],
      [2, 11, 20],
      [3, 12, 21],
      [4, 13, 22],
      [5, 14, 23],
      [6, 15, 24],
      [7, 16, 25],
      [8, 17, 26],
      [9, 18, 27],
      [9, 17, 25],
      [8, 16, 24],
      [7, 15, 23],
      [6, 14, 22],
      [5, 13, 21],
      [4, 12, 20],
      [3, 11, 19],
      [1, 11, 21],
      [2, 12, 22],
      [3, 13, 23],
      [4, 14, 24],
      [5, 15, 25],
      [6, 16, 26],
      [7, 17, 27],
    ], // possible wins
    [1, 10, 2, 11, 3], // human plays and intends to achieve [1, 10, 19], [2, 11, 20],
    [7, 19, 23, 22], // computer plays
    3, // number of rows
    9, // number of columns
  )

  /** user played [1, 10, 2, 11, 3]
   * so user next will be playing
   *  19 to win [1, 10, 19]
   *  or 20 to win [2, 11, 20]
   */
  // so computer need to play a defensive of 19 or 20
  expect([19, 20]).toContain(bestMove)
})
