import React from 'react';
import './App.css';
import { Board } from './board/Board';
import { InfoCard } from './info/InfoCard';
import { MadeWithLove } from './info/MadeWithLove';

function App() {
  return (
    <div className="">
      <div className="mt-6">
        <Board randomizeStartingPlayer={true}/>
      </div>
      <InfoCard  className="mt-32 mb-20"/>
      <MadeWithLove className="fixed bottom-0 right-0 px-4 pb-2 bg-white"/>
    </div>
  );
}

export default App;
