import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import HexBinPlot from './HexBinPlot';

const GameCard = ({ game, isSelected, onSelect }) => {
  const teamLogoUrl = (teamId) => `https://cdn.nba.com/logos/nba/${teamId}/global/L/logo.svg`;

  const isHomeGame = game.MATCHUP.includes('vs.');
  const homeAwayText = isHomeGame ? 'vs.' : '@';

  return (
    <Card 
      sx={{ 
        width: 50,
        height: 50,
        m: 0.1,
        backgroundImage: `url(${teamLogoUrl(game.OPPONENT_TEAM_ID)})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        cursor: 'pointer',
        border: isSelected ? '2px solid blue' : 'none',
      }}
      onClick={() => onSelect(game.GAME_ID)}
    >
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      />
      <CardContent sx={{ position: 'relative', zIndex: 1, p: 0.25 }}>
        <Typography variant="caption" color={game.WL === 'W' ? 'success.main' : 'error.main'} fontWeight="bold" fontSize="0.6rem">
          {game.WL}
        </Typography>
        <Typography variant="caption" color='#000' fontSize="0.6rem">
          {homeAwayText}
        </Typography>
      </CardContent>
    </Card>
  );
};

const TeamSeasonGames = ({ games, selectedGameId, onGameSelect, playerId, shotchartData, gameLogData }) => {
  const rows = [];
  for (let i = 0; i < games.length; i += 10) {
    rows.push(games.slice(i, i + 10));
  }

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {rows.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <Grid container spacing={0.25} justifyContent="flex-start" wrap="nowrap">
            {row.map((game) => (
              <Grid item key={game.GAME_ID}>
                <GameCard 
                  game={game} 
                  isSelected={game.GAME_ID === selectedGameId}
                  onSelect={onGameSelect}
                />
              </Grid>
            ))}
          </Grid>
          {row.some(game => game.GAME_ID === selectedGameId) && shotchartData && gameLogData && (
            <Box 
              sx={{ 
                height: '50vh',
                bgcolor: 'black',
                width: '100%',
                mt: 0.25,
                mb: 0.25,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
              }}
            >
              <Box sx={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '90%', height: '90%', position: 'relative' }}>
                  <HexBinPlot data={shotchartData} />
                </Box>
              </Box>
              <Box sx={{ width: '45%', height: '100%', color: 'white', overflowY: 'auto' }}>
                <Typography variant="h6">Game Log</Typography>
                <Typography>Date: {new Date(gameLogData.GAME_DATE).toLocaleDateString()}</Typography>
                <Typography>Matchup: {gameLogData.MATCHUP}</Typography>
                <Typography>Result: {gameLogData.WL}</Typography>
                <Typography>Minutes: {gameLogData.MIN}</Typography>
                <Typography>Points: {gameLogData.PTS}</Typography>
                <Typography>Rebounds: {gameLogData.REB}</Typography>
                <Typography>Assists: {gameLogData.AST}</Typography>
                <Typography>Steals: {gameLogData.STL}</Typography>
                <Typography>Blocks: {gameLogData.BLK}</Typography>
                <Typography>FG: {gameLogData.FGM}/{gameLogData.FGA} ({(gameLogData.FG_PCT * 100).toFixed(1)}%)</Typography>
                <Typography>3PT: {gameLogData.FG3M}/{gameLogData.FG3A} ({(gameLogData.FG3_PCT * 100).toFixed(1)}%)</Typography>
                <Typography>FT: {gameLogData.FTM}/{gameLogData.FTA} ({(gameLogData.FT_PCT * 100).toFixed(1)}%)</Typography>
              </Box>
            </Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default TeamSeasonGames;
