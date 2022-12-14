import { render, fireEvent } from '@testing-library/react';
import assert from 'assert';
import { Board } from './Board';
import { BoardPageObject } from './Board.po';


it('renders correct rows and columns', () => {
  render(<Board />);
  const board = new BoardPageObject();
  board.setMatrix(3, 3)
  expect(board.squares.length).toStrictEqual(9);

  board.setMatrix(4, 4)
  expect(board.squares.length).toStrictEqual(16);

  board.setMatrix(3, 4)
  expect(board.squares.length).toStrictEqual(12);

  board.setMatrix(6, 4)
  expect(board.squares.length).toStrictEqual(24);
});

it('renders correct square alternating content', () => {
  render(<Board />);
  const board = new BoardPageObject();

  board.setMatrix(4, 4);
  board.setSecondPlayerType('person');

  board.play(1);
  expect(board.squares[0]).toHaveTextContent('X');

  board.play(2);
  expect(board.squares[1]).toHaveTextContent('O');

  board.play(3);
  expect(board.squares[2]).toHaveTextContent('X');

  board.play(4);
  expect(board.squares[3]).toHaveTextContent('O');
});

it('wins horizontal', () => {
  render(<Board />);
  const board = new BoardPageObject();
  board.setSecondPlayerType('person');
  /**
   * O O
   * X X X
   *
   */
  // player X plays 4, 5, 5
  // player O plays 1, 2
  board.setMatrix(3, 3)
  board.play(4);
  board.play(1);
  board.play(5);
  board.play(2);
  board.play(6);

  // expecting win
  expect(board.winnerArea).toBeInTheDocument();
  // expecting player 1 to be the winner
  expect(board.winnerArea).toHaveTextContent('Player 1');
});

it('wins vertically', () => {
  render(<Board />);
  const board = new BoardPageObject();
  board.setSecondPlayerType('person');
  /**
   * O X X
   * O X
   * O
   */
  // player X plays 2, 3, 5
  // player O plays 1, 4, 7
  board.play(2);
  board.play(1);
  board.play(3);
  board.play(4);
  board.play(5);
  board.play(7);

  // expecting win
  expect(board.winnerArea).toBeInTheDocument();
  // expecting player O to be the winner
  expect(board.winnerArea).toHaveTextContent('Player 2');
});

it('wins diagonal to the left', () => {
  render(<Board />);
  const board = new BoardPageObject();
  board.setSecondPlayerType('person');
  /**
   * X X O
   *   O
   * O   X
   */
  // player X plays 1, 2, 9
  // player O plays 3, 5, 7
  board.play(1);
  board.play(3);
  board.play(2);
  board.play(5);
  board.play(9);
  board.play(7);

  // expecting win
  expect(board.winnerArea).toBeInTheDocument();
  // expecting player O to be the winner
  expect(board.winnerArea).toHaveTextContent('Player 2');
});

it('wins diagonal to the right', () => {
  render(<Board />);
  const board = new BoardPageObject();
  board.setSecondPlayerType('person');
  /**
   * X   O
   *   X
   * O   X
   */
  // player X plays 5, 9, 1
  // player O plays 7, 3
  board.play(5);
  board.play(7);
  board.play(9);
  board.play(3);
  board.play(1);

  // expecting win
  expect(board.winnerArea).toBeInTheDocument();
  // expecting player O to be the winner
  expect(board.winnerArea).toHaveTextContent('Player 1');
});

it('no winner', () => {
  render(<Board />);
  const board = new BoardPageObject();
  board.setSecondPlayerType('person');
  /**
   * X O X
   * X O X
   * O X O
   */
  // player X plays 1, 4, 3, 6, 8
  // player O plays 2, 5, 7, 9
  board.play(1);
  board.play(2);
  board.play(4);
  board.play(5);
  board.play(3);
  board.play(7);
  board.play(6);
  board.play(9);
  board.play(8);

  // expecting no win
  expect(board.noWinnerArea).toBeInTheDocument();
});

it('go again button resets', () => {
  render(<Board />);
  const board = new BoardPageObject();
  board.setSecondPlayerType('person');
  board.play(4);
  board.play(1);
  board.play(5);
  board.play(2);
  board.play(6);
  board.play(2);
  // player two wins

  fireEvent.click(board.resetButton);
  // expecting squares to be empty again
  expect(board.squares[0]).not.toHaveTextContent('X');
  expect(board.squares[0]).not.toHaveTextContent('O');
  // expecting next starting player should be O (player 2)
  assert(board.nextPlayerSymbol);
  expect(board.nextPlayerSymbol.innerHTML).toEqual('O');
  // no winner area should be hidden
  expect(board.noWinnerArea).not.toBeInTheDocument();
  // winner area should be hidden
  expect(board.winnerArea).not.toBeInTheDocument();
});
