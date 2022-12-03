import React, { ComponentProps, useState } from 'react';
import CSS from 'csstype';

const rowStyle = {
  display: 'flex'
}

const squareStyle: CSS.Properties = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle: CSS.Properties = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle: CSS.Properties = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square(props: { content: string, "data-testid": string } & ComponentProps<"div">) {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={props.onClick}
      data-testid={props['data-testid']}>
      {props.content}
    </div>
  );
}

/**
 * check if is a horizontal match
 */
function isCorrectHorizontal(numb1: number, numb2: number) {
  return numb1 + 1 === numb2;
}

/**
 * check if is a verital match
 */
function isCorrectVertical(numb1: number, numb2: number) {
  return numb1 + 3 === numb2;
}

/**
 * check if is a right diagonal match
 */
function isCorrectRightDiagonal(numb1: number, numb2: number) {
  return numb1 + 4 === numb2;
}

/**
 * check if is a left diagonal match
 */
function isCorrectLeftDiagonal(numb1: number, numb2: number) {
  return numb1 + 2 === numb2;
}


export function Board() {
  let [player1Hits, setPlayer1Hits] = useState<number[]>([]);
  let [player2Hits, setPlayer2Hits] = useState<number[]>([]);
  let [hitsContent, setHitsContent] = useState<Record<number, 'X' | 'O'>>({});
  let [isFirstPlayer, setIsFirstPlayer] = useState(true);
  let [won, setWon] = useState(false);


  const squareHit = (numb: number) => {
    // if already clicked return
    if (player1Hits.indexOf(numb) !== -1 || player2Hits.indexOf(numb) !== -1 || won)
      return;

    // if last hit
    if ((isFirstPlayer && player1Hits.length >= 2) || (!isFirstPlayer && player2Hits.length >= 2)) {
      const winnerSort = [...(isFirstPlayer ? player1Hits : player2Hits), numb].sort((a, b) => a - b)

      let win = false;
      // check horizontal
      if (isCorrectHorizontal(winnerSort[0], winnerSort[1])) {
        win = isCorrectHorizontal(winnerSort[1], winnerSort[2])
      }
      // check vertical
      else if (isCorrectVertical(winnerSort[0], winnerSort[1])) {
        win = isCorrectVertical(winnerSort[1], winnerSort[2])
      }
      // check right diagonal
      else if (isCorrectRightDiagonal(winnerSort[0], winnerSort[1])) {
        win = isCorrectRightDiagonal(winnerSort[1], winnerSort[2])
      }
      // check left diagonal
      else if (isCorrectLeftDiagonal(winnerSort[0], winnerSort[1])) {
        win = isCorrectLeftDiagonal(winnerSort[1], winnerSort[2])
      }
      setWon(win)
    }

    if (isFirstPlayer)
      setPlayer1Hits([...player1Hits, numb])
    else
      setPlayer2Hits([...player2Hits, numb])

    setHitsContent({ ...hitsContent, [numb]: isFirstPlayer ? 'X' : 'O' });

    setIsFirstPlayer(!isFirstPlayer);
  }

  const reset = () => {
    setWon(false)
    setIsFirstPlayer(true);
    setHitsContent({});
    setPlayer1Hits([]);
    setPlayer2Hits([]);
  }

  const noWinner = player1Hits.length + player2Hits.length === 9;

  return (
    <div style={containerStyle} data-testid="board" className="gameBoard">
      {
        noWinner ?
          <div data-testid="noWinnerArea" id="noWinnerArea" className="no-winner" style={instructionsStyle}>No winner</div>
          : won ?
            <div data-testid="winnerArea" id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span data-testid="winner-symbol">{!isFirstPlayer ? 'X' : 'O'}</span></div>
            : <div data-testid="statusArea" id="statusArea" className="status" style={instructionsStyle}>Next player: <span data-testid="next-player-symbol">{isFirstPlayer ? 'X' : 'O'}</span></div>}
      <button data-testid="btn-reset" style={buttonStyle} onClick={() => reset()}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square data-testid="square1" onClick={() => squareHit(1)} content={hitsContent[1]} />
          <Square data-testid="square2" onClick={() => squareHit(2)} content={hitsContent[2]} />
          <Square data-testid="square3" onClick={() => squareHit(3)} content={hitsContent[3]} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square data-testid="square4" onClick={() => squareHit(4)} content={hitsContent[4]} />
          <Square data-testid="square5" onClick={() => squareHit(5)} content={hitsContent[5]} />
          <Square data-testid="square6" onClick={() => squareHit(6)} content={hitsContent[6]} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square data-testid="square7" onClick={() => squareHit(7)} content={hitsContent[7]} />
          <Square data-testid="square8" onClick={() => squareHit(8)} content={hitsContent[8]} />
          <Square data-testid="square9" onClick={() => squareHit(9)} content={hitsContent[9]} />
        </div>
      </div>
    </div>
  );
}
