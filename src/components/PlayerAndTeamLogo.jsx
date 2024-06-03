import React from 'react';
import './PlayerAndTeamLogo.css';

const PlayerAndTeamLogo = ({ playerId, teamId }) => {
  const playerImageUrl = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`;
  const teamLogoUrl = `https://cdn.nba.com/logos/nba/${teamId}/global/D/logo.svg`;

  return (
    <div className="PlayerAndTeamLogo">
      <img className="team-logo" src={teamLogoUrl} alt={`Team ${teamId}`} />
      <img className="player-headshot" src={playerImageUrl} alt={`Player ${playerId}`} />
    </div>
  );
};

export default PlayerAndTeamLogo;

