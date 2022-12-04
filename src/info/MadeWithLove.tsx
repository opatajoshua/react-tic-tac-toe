import { ComponentProps } from 'react';

export function MadeWithLove(props: ComponentProps<'div'>) {
  return (
    <div {...props}>
      Made with ❤️ by{' '}
      <a
        href="https://joshuaopata.com/"
        target="_blank"
        className="text-blue-800 text-lg font-bold"
        rel="noreferrer"
      >
        Joshua Opata
      </a>
    </div>
  );
}
