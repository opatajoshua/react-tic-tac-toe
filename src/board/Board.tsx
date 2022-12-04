import { useCallback, useMemo, useState } from 'react';
import {
  possibleDiagonalToLeftWins,
  possibleDiagonalToRightWins,
  possibleHorizontalWins,
  possibleVerticalWins,
  winCheck,
} from './helpers';
import { Square, SquareOwner } from './Square';
import { Input } from './Input';
import confetti from 'canvas-confetti';

interface PlayState {
  player1Hits: number[];
  player2Hits: number[];
  hitOwners: Record<number, SquareOwner>;
  isFirstPlayer: boolean;
  won: boolean;
  started: boolean;
  completedButNoWin: boolean;
}

const initialPlayState = {
  player1Hits: [],
  player2Hits: [],
  hitOwners: {},
  isFirstPlayer: true,
  won: false,
  started: false,
  completedButNoWin: false,
};

export function Board() {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [playState, setPlayState] = useState<PlayState>(initialPlayState);

  const squareRows = useMemo(() => Array.from(Array(rows).keys()), [rows]);
  const squareColumns = useMemo(
    () => Array.from(Array(columns).keys()),
    [columns]
  );

  const structureSate = useMemo(() => {
    return {
      rows,
      columns,
      minExpectedHits: Math.min(rows, columns),
      possibleWins: [
        ...possibleHorizontalWins(rows, columns),
        ...possibleVerticalWins(rows, columns),
        ...possibleDiagonalToLeftWins(rows, columns),
        ...possibleDiagonalToRightWins(rows, columns),
      ],
    };
  }, [rows, columns]);

  // const { possibleWins, minExpectedHits } = structureSate;

  const squareHit = useCallback(
    (numb: number) => {
      // if already clicked return
      if (
        playState.player1Hits.indexOf(numb) !== -1 ||
        playState.player2Hits.indexOf(numb) !== -1 ||
        playState.won
      )
        return;

      const newPlayState: PlayState = { ...playState, started: true };

      if (playState.isFirstPlayer) {
        newPlayState.player1Hits = [...playState.player1Hits, numb];
      } else {
        newPlayState.player2Hits = [...playState.player2Hits, numb];
      }

      const { isFirstPlayer, hitOwners, player1Hits, player2Hits } =
        newPlayState;
      const { possibleWins, minExpectedHits } = structureSate;

      // if last hit
      if (
        (isFirstPlayer && player1Hits.length >= minExpectedHits) ||
        (!isFirstPlayer && player2Hits.length >= minExpectedHits)
      ) {
        newPlayState.won = winCheck(possibleWins, [
          ...(isFirstPlayer ? player1Hits : player2Hits),
          numb,
        ]);
        if (newPlayState.won) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      }

      if (
        !newPlayState.won &&
        player1Hits.length + player2Hits.length ===
          structureSate.rows * structureSate.columns
      )
        newPlayState.completedButNoWin = true;

      setPlayState({
        ...newPlayState,
        hitOwners: { ...hitOwners, [numb]: isFirstPlayer ? 1 : 2 },
        isFirstPlayer: !isFirstPlayer,
      });
    },
    [structureSate, playState]
  );

  const { isFirstPlayer, won, hitOwners, started, completedButNoWin } =
    playState;

  return (
    <div data-testid="board" className="flex flex-col items-center">
      <div className="text-lg">
        {completedButNoWin ? (
          <div
            data-testid="noWinnerArea"
            id="noWinnerArea"
            className="no-winner flex items-center"
          >
            No winner
          </div>
        ) : won ? (
          <div
            data-testid="winnerArea"
            id="winnerArea"
            className="winner flex items-center"
          >
            Winner:{' '}
            <span
              data-testid="winner-symbol"
              className={`ml-2 text-2xl font-extrabold ${
                isFirstPlayer ? 'text-teal-700' : 'text-yellow-600'
              }`}
            >
              {!isFirstPlayer ? 'X' : 'O'}
            </span>
          </div>
        ) : (
          <div
            data-testid="statusArea"
            id="statusArea"
            className="status flex items-center"
          >
            Next player:
            <span
              data-testid="next-player-symbol"
              className={`ml-2 text-2xl font-extrabold ${
                isFirstPlayer ? 'text-teal-700' : 'text-yellow-600'
              }`}
            >
              {isFirstPlayer ? 'X' : 'O'}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-3">
        {!started ? (
          <>
            <div className="w-20">
              <Input
                id="rowInput"
                data-testid="rowInput"
                type="number"
                label="Rows"
                min="3"
                max="15"
                onChange={(v) => setRows(Number(v.target.value))}
                value={rows}
              />
            </div>
            <div className="w-20">
              <Input
                id="colInput"
                data-testid="colInput"
                type="number"
                label="columns"
                min="3"
                max="15"
                onChange={(v) => setColumns(Number(v.target.value))}
                value={columns}
              />
            </div>
          </>
        ) : (
          <button
            data-testid="btn-reset"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setPlayState(initialPlayState)}
          >
            Reset
          </button>
        )}
      </div>

      <div className="bg-slate-100 flex flex-col items-center mt-5 w-11/12 h-11/12  md:w-fit lg:h-fit md:max-w-screen-2xl mx-auto p-3 border-2 rounded overflow-x-auto">
        <table className="w-full">
          <tbody>
            {squareRows.map((rowIndex) => (
              <tr key={rowIndex}>
                {squareColumns.map((r, columnIndex) => {
                  const cellIndex = rowIndex * columns + columnIndex;
                  return (
                    <td key={cellIndex}>
                      <Square
                        className="square-item py-3 px-3 md:p-5 text-lg font-black min-w-0 m-1 "
                        data-testid={`square${cellIndex + 1}`}
                        onClick={() => squareHit(cellIndex + 1)}
                        owner={hitOwners[cellIndex + 1]}
                        number={cellIndex + 1}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
