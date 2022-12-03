import React from 'react';
import { Board } from './Board';
import './App.css';

function App() {
  return (
    <div className="game">
      <h1 data-testid="app-title">React tic-tac-toe</h1>
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default App;
