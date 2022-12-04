import { ComponentProps } from 'react';

export type SquareOwner = undefined | 1 | 2;

export function Square(
  props: {
    owner: SquareOwner;
    'data-testid': string;
    number?: number;
  } & ComponentProps<'div'>
) {
  return (
    <div
      className={
        ' flex-1 rounded-md flex justify-center ' +
        props.className +
        (props.owner
          ? props.owner === 1
            ? ' bg-teal-200 text-teal-700'
            : ' bg-yellow-200 text-yellow-700'
          : ' bg-gray-200 text-gray-200 cursor-pointer')
      }
      onClick={props.onClick}
      data-testid={props['data-testid']}
    >
      &nbsp;
      <span data-testid="square-content">
        {props.owner ? (
          props.owner === 1 ? (
            'X'
          ) : (
            'O'
          )
        ) : (
          <>&nbsp;&nbsp;&nbsp;&nbsp;</>
        )}
      </span>
      &nbsp;
      {/* <span className="text-red-400">{props.number}</span> */}
    </div>
  );
}
