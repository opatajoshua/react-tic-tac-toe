import { screen } from "@testing-library/react";

export class BoardPageObject {
  get container() {
    return screen.getByTestId(/board/i);
  }
  get noWinnerArea(): HTMLElement | null {
    return screen.queryByTestId(/noWinnerArea/i);
  }
  get winnerArea(): HTMLElement | null {
    return screen.queryByTestId(/winnerArea/i);
  }
  get winnerSymbol(): HTMLElement | null {
    return screen.queryByTestId(/winner-symbol/i);
  }
  get nextPlayerSymbol(): HTMLElement | null {
    return screen.queryByTestId(/next-player-symbol/i);
  }
  get statusArea(): HTMLElement {
    return screen.getByTestId(/statusArea/i);
  }
  get resetButton(): HTMLElement {
    return screen.getByTestId(/btn-reset/i);
  }
  get square1() {
    return screen.getByTestId(/square1/i);
  }
  get square2() {
    return screen.getByTestId(/square2/i);
  }
  get square3() {
    return screen.getByTestId(/square3/i);
  }
  get square4() {
    return screen.getByTestId(/square4/i);
  }
  get square5() {
    return screen.getByTestId(/square5/i);
  }
  get square6() {
    return screen.getByTestId(/square6/i);
  }
  get square7() {
    return screen.getByTestId(/square7/i);
  }
  get square8() {
    return screen.getByTestId(/square8/i);
  }
  get square9() {
    return screen.getByTestId(/square9/i);
  }
}
