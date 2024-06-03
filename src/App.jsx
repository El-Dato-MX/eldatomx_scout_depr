import React from 'react';
import HexBinPlot from './components/HexBinPlotTwo';
import PlayerAndTeamLogo from './components/PlayerAndTeamLogo';
import './App.css';

function App() {
  return (
    <div className="App">
     <h1>NBA Shot Chart HexBin Plot</h1>
      <div className="logos">
        <PlayerAndTeamLogo playerId="1626174" teamId="1610612747" />
      </div>
      <div className="plot">
        <HexBinPlot />
      </div>
    </div>
  );
}

export default App;

