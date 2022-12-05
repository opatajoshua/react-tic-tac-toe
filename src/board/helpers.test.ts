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
  const rows =  3;
  const columns =  5;
  const possibleHorizontalWins =  [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
  ];
  const possibleVerticalWins =  [
    [1, 6, 11],
    [2, 7, 12],
    [3, 8, 13],
    [4, 9, 14],
    [5, 10, 15],
  ];
  const possibleDiagonalToLeftWins =  [
    [5, 9, 13],
    [4, 8, 12],
    [3, 7, 11],
  ];
  const possibleDiagonalToRightWins =  [
    [1, 7, 13],
    [2, 8, 14],
    [3, 9, 15],
  ];

  const structureState = {
    rows,
    columns,
    minExpectedHits: Math.min(rows, columns),
    possibleHorizontalWins: possibleHorizontalWins,
    possibleVerticalWins: possibleVerticalWins,
    possibleDiagonalToLeftWins: possibleDiagonalToLeftWins,
    possibleDiagonalToRightWins: possibleDiagonalToRightWins,
    possibleWins: [
      ...possibleHorizontalWins,
      ...possibleVerticalWins,
      ...possibleDiagonalToLeftWins,
      ...possibleDiagonalToRightWins,
    ],
  }

  const humanPlays= [1, 2];
  const computerPlays= [7];
  const expectedDefensiveMoves= [3, 4, 5];

  // expecting a defensive play
  const bestMove = computerMove(
    structureState, // possible wins
    humanPlays, // human plays,
    computerPlays, // computer plays
    rows, // number of rows
    columns, // number of columns
  )

  // /** user played [1, 2]
  //  * so user next will be playing
  //  *  3, 4, 5 to win
  //  */
  // // so computer need to play a defensive of 19 or 20
  expect(expectedDefensiveMoves).toContain(bestMove)
})
