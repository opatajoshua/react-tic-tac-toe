import { screen } from '@testing-library/react';

export class SquarePageObject {
  constructor(public dataTestTestId: string){

  }
  get element(): HTMLElement {
    return screen.getByTestId(`${this.dataTestTestId}`);
  }
  get content(): HTMLElement | null {
    return screen.queryByTestId(/square-content/i);
  }
}
