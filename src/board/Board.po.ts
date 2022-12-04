import { fireEvent, screen } from '@testing-library/react';

export class BoardPageObject {
  get element() {
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
  get colInput(): HTMLInputElement{
    return screen.getByTestId(/colInput/i);
  }
  get rowInput(): HTMLInputElement {
    return screen.getByTestId(/rowInput/i);
  }
  get squares(): HTMLCollectionOf<Element> {
    return this.element.getElementsByClassName('square-item');
  }

  setMatrix(rows: number, columns: number){
    fireEvent.change(this.colInput, {target: {value: columns }})
    fireEvent.change(this.rowInput, {target: {value: rows }})
  }

  play(cellNumber: number){
    fireEvent.click(this.squares[cellNumber-1]);
  }
}
