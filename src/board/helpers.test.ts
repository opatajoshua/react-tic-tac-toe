import {
  compareWin,
  possibleDiagonalToLeftWins,
  possibleDiagonalToRightWins,
  possibleHorizontalWins,
  possibleVerticalWins,
  rowNumber,
  winCheck,
} from './helpers';

it('rowNumber return correct value', () => {
  const columns = 3;
  expect(rowNumber(1, columns)).toStrictEqual(1);
  expect(rowNumber(3, columns)).toStrictEqual(1);
  expect(rowNumber(4, columns)).toStrictEqual(2);
  expect(rowNumber(5, columns)).toStrictEqual(2);
  expect(rowNumber(7, columns)).toStrictEqual(3);
  expect(rowNumber(9, columns)).toStrictEqual(3);
});

it('possibleVerticalWins returns all expected wins', () => {
  expect(new Set(possibleVerticalWins(3, 3))).toEqual(
    new Set([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ])
  );
  expect(new Set(possibleVerticalWins(3, 4))).toEqual(
    new Set([
      [1, 5, 9],
      [2, 6, 10],
      [3, 7, 11],
      [4, 8, 12],
    ])
  );
  expect(new Set(possibleVerticalWins(5, 2))).toEqual(
    new Set([
      [1, 3, 5, 7, 9],
      [2, 4, 6, 8, 10],
    ])
  );

  // should be complete wins
  expect(new Set(possibleVerticalWins(5, 2))).not.toEqual(
    new Set([
      [1, 3, 5, 7, 9],
      [2, 4, 6, 8, 9],
    ])
  );
});

it('possibleHorizontalWins returns all expected wins', () => {
  expect(new Set(possibleHorizontalWins(3, 3))).toEqual(
    new Set([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  );

  expect(new Set(possibleHorizontalWins(3, 4))).toEqual(
    new Set([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ])
  );

  expect(new Set(possibleHorizontalWins(5, 3))).toEqual(
    new Set([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
      [13, 14, 15],
    ])
  );

  // should be complete wins
  expect(new Set(possibleHorizontalWins(5, 3))).not.toEqual(
    new Set([
      [1, 2, 3],
      [4, 5, 6],
    ])
  );
});

it('possibleDiagonalToLeftWins returns all expected wins', () => {
  expect(new Set(possibleDiagonalToLeftWins(3, 3))).toEqual(
    new Set([[3, 5, 7]])
  );

  expect(new Set(possibleDiagonalToLeftWins(3, 4))).toEqual(
    new Set([
      [4, 7, 10],
      [3, 6, 9],
    ])
  );

  expect(new Set(possibleDiagonalToLeftWins(5, 3))).toEqual(
    new Set([
      [3, 5, 7],
      [6, 8, 10],
      [9, 11, 13],
    ])
  );

  // should be complete wins
  expect(new Set(possibleDiagonalToLeftWins(5, 3))).not.toEqual(
    new Set([
      [3, 5, 7],
      [6, 8, 10],
    ])
  );
});

it('possibleDiagonalToRightWins returns all expected wins', () => {
  expect(new Set(possibleDiagonalToRightWins(3, 3))).toEqual(
    new Set([[1, 5, 9]])
  );

  expect(new Set(possibleDiagonalToRightWins(3, 4))).toEqual(
    new Set([
      [1, 6, 11],
      [2, 7, 12],
    ])
  );

  expect(new Set(possibleDiagonalToRightWins(5, 3))).toEqual(
    new Set([
      [1, 5, 9],
      [4, 8, 12],
      [7, 11, 15],
    ])
  );

  // should be complete wins
  expect(new Set(possibleDiagonalToRightWins(5, 3))).not.toEqual(
    new Set([
      [1, 5, 9],
      [4, 8, 12],
    ])
  );
});

it('compareWin matches array items as expected', () => {
  expect(compareWin([4, 8, 12], [9, 4, 8, 12])).toStrictEqual(true);
  expect(compareWin([4, 8, 7], [9, 4, 8, 12])).toStrictEqual(false);
});

it('winCheck finds the correct match of plays from possible wins', () => {
  const possibleWins = [
    [1, 5, 9],
    [4, 8, 12],
    [7, 11, 15],
  ];
  expect(winCheck(possibleWins, [9, 1, 8, 5])).toStrictEqual(true);
  expect(winCheck(possibleWins, [9, 1, 8, 12])).toStrictEqual(false);
});
