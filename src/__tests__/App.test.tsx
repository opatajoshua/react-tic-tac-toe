import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

it('renders without crashing', () => {
  render(<App />);
  const titleElement = screen.getByTestId(/app-title/i);
  expect(titleElement).toBeInTheDocument();
});