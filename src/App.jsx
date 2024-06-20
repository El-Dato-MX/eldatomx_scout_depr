import React from 'react';
import PlayerAndTeamLogo from './components/PlayerAndTeamLogo';
import './App.css';
import HexBinPlot from './components/HexBinPlot';


function App() {
  return (
    <div className="App">
   {/* <h1>NBA Shot Chart HexBin Plot</h1> */}
      <div className="logos">
        <PlayerAndTeamLogo playerId="1626174" teamId="1610612747" />
      </div>
    <HexBinPlot />
    </div>
  );
}

export default App;

