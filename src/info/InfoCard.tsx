import { ComponentProps } from 'react';

export function InfoCard(props: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={`flex flex-col max-w-lg mx-auto bg-slate-100 px-10 py-8 rounded-md ${props.className}`}
    >
      <h1
        data-testid="app-title"
        className="text-3xl font-bold mb-1 text-blue-800"
      >
        React tic-tac-toe
      </h1>
      <p className="text-gray-600">
        My attempt to implement a multi-matrix tic-tac-toe.
      </p>
      <a
        href="https://github.com/opatajoshua/react-tic-tac-toe"
        className="text-blue-700"
        target="_blank" rel="noreferrer"
      >
        ‍👨‍💻 link to code on github
      </a>
      <div className="flex gap-3 mt-3 items-end justify-end">
        <p className="text-lg mr-3">Follow me on </p>
        <a
          href="https://github.com/opatajoshua"
          target="_blank"
          rel="noreferrer"
        >
          <img src="imgs/github.png" alt="" className="w-8" />
        </a>
        <a href="https://twitter.com/JOLk22" target="_blank" rel="noreferrer">
          <img src="imgs/twitter.png" alt="" className="w-8" />
        </a>
      </div>
    </div>
  );
}
