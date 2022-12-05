import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  computerMove,
  possibleDiagonalToLeftWins,
  possibleDiagonalToRightWins,
  possibleHorizontalWins,
  possibleVerticalWins,
  winCheck,
} from './helpers'
import { Square, SquareOwner } from './Square'
import { Input } from './Input'
import confetti from 'canvas-confetti'
import { ManIcon } from '../icons/ManIcon'
import { AndroidIcon } from '../icons/AndroidIcon'

interface PlayState {
  player1Hits: number[]
  player2Hits: number[]
  hitOwners: Record<number, SquareOwner>
  isFirstPlayer: boolean
  won: boolean
  started: boolean
  completedButNoWin: boolean
  scores: {
    player1: number
    player2: number
  }
}

const initialPlayState = {
  player1Hits: [],
  player2Hits: [],
  hitOwners: {},
  isFirstPlayer: true,
  won: false,
  started: false,
  completedButNoWin: false,
  scores: {
    player1: 0,
    player2: 0,
  },
}

export interface StructureState {
  rows: number
  columns: number
  minExpectedHits: number
  possibleHorizontalWins: number[][]
  possibleVerticalWins: number[][]
  possibleDiagonalToLeftWins: number[][]
  possibleDiagonalToRightWins: number[][]
  possibleWins: number[][]
}

const PlayerButtonClass = 'flex-1 flex justify-center p-1 rounded-full h-10 items-center '

export function Board() {
  const [rows, setRows] = useState(3)
  const [columns, setColumns] = useState(3)
  const [playState, setPlayState] = useState<PlayState>({
    ...initialPlayState,
    scores: { ...initialPlayState.scores },
  })
  const [isHumanSecPlayer, changeIsHumanSecPlayer] = useState(false)

  const squareRows = useMemo(() => Array.from(Array(rows).keys()), [rows])
  const squareColumns = useMemo(() => Array.from(Array(columns).keys()), [columns])

  const structureState: StructureState = useMemo(() => {
    const _possibleHorizontalWins = possibleHorizontalWins(rows, columns)
    const _possibleVerticalWins = possibleVerticalWins(rows, columns)
    const _possibleDiagonalToLeftWins = possibleDiagonalToLeftWins(rows, columns)
    const _possibleDiagonalToRightWins = possibleDiagonalToRightWins(rows, columns)

    return {
      rows,
      columns,
      minExpectedHits: Math.min(rows, columns),
      possibleHorizontalWins: _possibleHorizontalWins,
      possibleVerticalWins: _possibleVerticalWins,
      possibleDiagonalToLeftWins: _possibleDiagonalToLeftWins,
      possibleDiagonalToRightWins: _possibleDiagonalToRightWins,
      possibleWins: [
        ..._possibleHorizontalWins,
        ..._possibleVerticalWins,
        ..._possibleDiagonalToLeftWins,
        ..._possibleDiagonalToRightWins,
      ],
    }
  }, [rows, columns])

  const squareHit = useCallback(
    (numb: number) => {
      // if already clicked return
      if (
        playState.player1Hits.indexOf(numb) !== -1 ||
        playState.player2Hits.indexOf(numb) !== -1 ||
        playState.won
      ) {
        return
      }

      const newPlayState: PlayState = { ...playState, started: true }

      if (playState.isFirstPlayer) {
        newPlayState.player1Hits = [...playState.player1Hits, numb]
      } else {
        newPlayState.player2Hits = [...playState.player2Hits, numb]
      }

      const { isFirstPlayer, hitOwners, player1Hits, player2Hits } = newPlayState
      const { possibleWins, minExpectedHits } = structureState

      // if last hit
      if (
        (isFirstPlayer && player1Hits.length >= minExpectedHits) ||
        (!isFirstPlayer && player2Hits.length >= minExpectedHits)
      ) {
        newPlayState.won = winCheck(possibleWins, [
          ...(isFirstPlayer ? player1Hits : player2Hits),
          numb,
        ])
        if (newPlayState.won) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })
          if (isFirstPlayer) newPlayState.scores.player1++
          else newPlayState.scores.player2++
        }
      }

      if (
        !newPlayState.won &&
        player1Hits.length + player2Hits.length === structureState.rows * structureState.columns
      )
        newPlayState.completedButNoWin = true

      setPlayState({
        ...newPlayState,
        hitOwners: { ...hitOwners, [numb]: isFirstPlayer ? 1 : 2 },
        isFirstPlayer: !isFirstPlayer,
      })
    },
    [structureState, playState],
  )

  const { isFirstPlayer, won, hitOwners, started, completedButNoWin } = playState

  // play computer
  useEffect(() => {
    if (
      !playState.isFirstPlayer &&
      !isHumanSecPlayer &&
      rows * columns !== playState.player1Hits.length + playState.player2Hits.length
    ) {
      const move = computerMove(
        structureState,
        playState.player1Hits,
        playState.player2Hits,
        rows,
        columns,
        true,
      )
      squareHit(move)
    }
  }, [columns, isHumanSecPlayer, playState, rows, squareHit, structureState])

  return (
    <div data-testid='board' className='flex flex-col items-center'>
      <div className='text-lg'>
        {completedButNoWin ? (
          <div
            data-testid='noWinnerArea'
            id='noWinnerArea'
            className='no-winner flex items-center font-medium text-red-900'
          >
            🚫 No winner
          </div>
        ) : won ? (
          <div data-testid='winnerArea' id='winnerArea' className='winner flex items-center'>
            <span className='mr-2'>🎉</span>
            <span
              className={`mr-2 font-bold ${!isFirstPlayer ? 'text-teal-700' : 'text-yellow-600'}`}
            >
              {!isFirstPlayer ? 'Player 1' : !isHumanSecPlayer ? 'Computer' : ' Player 2'} Wins
            </span>
          </div>
        ) : (
          <div data-testid='statusArea' id='statusArea' className='status flex items-center'>
            Next player:
            <span
              data-testid='next-player-symbol'
              className={`ml-2 text-2xl font-extrabold ${
                isFirstPlayer ? 'text-teal-700' : 'text-yellow-600'
              }`}
            >
              {isFirstPlayer ? 'X' : 'O'}
            </span>
          </div>
        )}
      </div>

      <div className='flex gap-4 mt-3'>
        {!started ? (
          <>
            <div className='w-20'>
              <Input
                id='rowInput'
                data-testid='rowInput'
                type='number'
                label='Rows'
                min='3'
                max='15'
                onChange={(v) => setRows(Number(v.target.value))}
                value={rows}
              />
            </div>
            <div className='w-20'>
              <Input
                id='colInput'
                data-testid='colInput'
                type='number'
                label='columns'
                min='3'
                max='15'
                onChange={(v) => setColumns(Number(v.target.value))}
                value={columns}
              />
            </div>
            <div className=''>
              <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1'>
                Choose player 2
              </label>
              <div className='bg-slate-100 py-1 px-2 flex gap-2'>
                <button
                  data-testid='btnHumanSecondPlayer'
                  className={
                    PlayerButtonClass + (isHumanSecPlayer ? 'bg-yellow-50' : 'bg-gray-200')
                  }
                  onClick={() => {
                    changeIsHumanSecPlayer(true),
                      setPlayState({ ...playState, scores: { ...initialPlayState.scores } })
                  }}
                >
                  <ManIcon
                    className={isHumanSecPlayer ? 'fill-yellow-600' : 'fill-gray-400'}
                  ></ManIcon>
                </button>
                <button
                  data-testid='btnComputerSecondPlayer'
                  className={
                    PlayerButtonClass + (!isHumanSecPlayer ? 'bg-yellow-50' : 'bg-gray-200')
                  }
                  onClick={() => {
                    changeIsHumanSecPlayer(false),
                      setPlayState({ ...playState, scores: { ...initialPlayState.scores } })
                  }}
                >
                  <AndroidIcon
                    className={!isHumanSecPlayer ? 'fill-yellow-600' : 'fill-gray-400'}
                  ></AndroidIcon>
                </button>
              </div>
            </div>
          </>
        ) : (
          <button
            data-testid='btn-reset'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => setPlayState({ ...initialPlayState, scores: playState.scores })}
          >
            Reset
          </button>
        )}
      </div>

      <div className='bg-slate-100 flex flex-col items-center mt-5 w-11/12 h-11/12  md:w-fit lg:h-fit md:max-w-screen-2xl mx-auto p-3 border-2 rounded overflow-x-auto'>
        <table className='w-full'>
          <tbody>
            {squareRows.map((rowIndex) => (
              <tr key={rowIndex}>
                {squareColumns.map((r, columnIndex) => {
                  const cellIndex = rowIndex * columns + columnIndex
                  return (
                    <td key={cellIndex} className='p-2'>
                      <Square
                        className='square-item py-3 px-3 md:p-5 text-lg font-black min-w-0 w-full '
                        data-testid={`square${cellIndex + 1}`}
                        onClick={() => squareHit(cellIndex + 1)}
                        owner={hitOwners[cellIndex + 1]}
                        number={cellIndex + 1}
                        disabled={
                          !!hitOwners[cellIndex + 1] || won || (!isFirstPlayer && !isHumanSecPlayer)
                        }
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {started || playState.scores.player1 || playState.scores.player2 ? (
        <div className='flex gap-3 mt-4 items-center'>
          <p className='text-lg font-black text-teal-500'>{playState.scores.player1}</p>
          <ManIcon className={isFirstPlayer ? 'fill-teal-500' : 'fill-gray-400'}></ManIcon>
          <b className='text-gray-500'>VS</b>

          {isHumanSecPlayer ? (
            <ManIcon className={!isFirstPlayer ? 'fill-yellow-600' : 'fill-gray-400'}></ManIcon>
          ) : (
            <AndroidIcon
              className={!isFirstPlayer ? 'fill-yellow-600' : 'fill-gray-400'}
            ></AndroidIcon>
          )}
          <p className='text-lg font-black text-yellow-600'>{playState.scores.player2}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
