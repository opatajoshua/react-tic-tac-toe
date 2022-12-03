import { render, fireEvent } from "@testing-library/react";
import { Board } from "../Board";
import { BoardPageObject } from "../page-objects/Board";
import assert from "assert";

it("renders alternating contents", () => {
  render(<Board />);
  const board = new BoardPageObject();

  fireEvent.click(board.square1);
  expect(board.square1.innerHTML).toEqual("X");

  fireEvent.click(board.square2);
  expect(board.square2.innerHTML).toEqual("O");

  fireEvent.click(board.square9);
  expect(board.square9.innerHTML).toEqual("X");
});

it("wins horizontal", () => {
  render(<Board />);
  const board = new BoardPageObject();
  /**
   * O O
   * X X X
   *
   */
  // player X plays 4, 5, 5
  // player O plays 1, 2
  fireEvent.click(board.square4);
  fireEvent.click(board.square1);
  fireEvent.click(board.square5);
  fireEvent.click(board.square2);
  fireEvent.click(board.square6);

  // expecting win
  expect(board.winnerArea).toBeInTheDocument();
  // expecting player X to be the winner
  assert(board.winnerSymbol);
  expect(board.winnerSymbol.innerHTML).toEqual("X");
});

it("wins vertically", () => {
  render(<Board />);
  const board = new BoardPageObject();
  /**
   * O X X
   * O X
   * O
   */
  // player X plays 2, 3, 5
  // player O plays 1, 4, 7
  fireEvent.click(board.square2);
  fireEvent.click(board.square1);
  fireEvent.click(board.square3);
  fireEvent.click(board.square4);
  fireEvent.click(board.square5);
  fireEvent.click(board.square7);

  // expecting win
  expect(board.winnerArea).toBeInTheDocument();
  // expecting player O to be the winner
  assert(board.winnerSymbol);
  expect(board.winnerSymbol.innerHTML).toEqual("O");
});

it("wins diagonal to the left", () => {
  render(<Board />);
  const board = new BoardPageObject();
  /**
   * X X O
   *   O
   * O   X
   */
  // player X plays 1, 2, 9
  // player O plays 3, 5, 7
  fireEvent.click(board.square1);
  fireEvent.click(board.square3);
  fireEvent.click(board.square2);
  fireEvent.click(board.square5);
  fireEvent.click(board.square9);
  fireEvent.click(board.square7);

  // expecting win
  expect(board.winnerArea).toBeInTheDocument();
  // expecting player O to be the winner
  assert(board.winnerSymbol);
  expect(board.winnerSymbol.innerHTML).toEqual("O");
});

it("wins diagonal to the right", () => {
  render(<Board />);
  const board = new BoardPageObject();
  /**
   * X   O
   *   X
   * O   X
   */
  // player X plays 5, 9, 1
  // player O plays 7, 3
  fireEvent.click(board.square5);
  fireEvent.click(board.square7);
  fireEvent.click(board.square9);
  fireEvent.click(board.square3);
  fireEvent.click(board.square1);

  // expecting win
  expect(board.winnerArea).toBeInTheDocument();
  // expecting player O to be the winner
  assert(board.winnerSymbol);
  expect(board.winnerSymbol.innerHTML).toEqual("X");
});

it("no winner", () => {
  render(<Board />);
  const board = new BoardPageObject();
  /**
   * X O X
   * X O X
   * O X O
   */
  // player X plays 1, 4, 3, 6, 8
  // player O plays 2, 5, 7, 9
  fireEvent.click(board.square1);
  fireEvent.click(board.square2);
  fireEvent.click(board.square4);
  fireEvent.click(board.square5);
  fireEvent.click(board.square3);
  fireEvent.click(board.square7);
  fireEvent.click(board.square6);
  fireEvent.click(board.square9);
  fireEvent.click(board.square8);

  // expecting no win
  expect(board.noWinnerArea).toBeInTheDocument();
});

it("reset button resets", () => {
  render(<Board />);
  const board = new BoardPageObject();
  fireEvent.click(board.square4);
  fireEvent.click(board.square1);
  fireEvent.click(board.square5);
  fireEvent.click(board.square2);
  fireEvent.click(board.square6);

  fireEvent.click(board.resetButton);
  // expecting squares to be empty again
  expect(board.square1.innerHTML).toEqual("");
  // expecting next player to be X again
  assert(board.nextPlayerSymbol);
  expect(board.nextPlayerSymbol.innerHTML).toEqual("X");
  // no winner area should be hidden
  expect(board.noWinnerArea).not.toBeInTheDocument();
  // winner area should be hidden
  expect(board.winnerArea).not.toBeInTheDocument();
});
