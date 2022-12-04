import { ComponentProps } from 'react';

export function Input(props: { label: string } & ComponentProps<'input'>) {
  return (
    <div className="w-full" id={props.id}>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
        htmlFor={'input-' + props.id}
      >
        {props.label ?? props.placeholder}
      </label>
      <input
        id={'input-' + props.id}
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        placeholder={props.placeholder ?? props.label}
        {...props}
      />
    </div>
  );
}
