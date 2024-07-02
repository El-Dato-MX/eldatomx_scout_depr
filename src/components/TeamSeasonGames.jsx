import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const GameCard = ({ game, isSelected, onSelect }) => {
  const teamLogoUrl = (teamId) => `https://cdn.nba.com/logos/nba/${teamId}/global/L/logo.svg`;

  const isHomeGame = game.MATCHUP.includes('vs.');
  const homeAwayText = isHomeGame ? 'vs.' : '@';

  return (
    <Card 
      sx={{ 
        width: 50,  // Further reduced from 60
        height: 50, // Further reduced from 60
        m: 0.1,     // Further reduced from 0.25
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

const TeamSeasonGames = ({ games, selectedGameId, onGameSelect }) => {
  // Group games into rows of 10
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
          {row.some(game => game.GAME_ID === selectedGameId) && (
            <Box 
              sx={{ 
                height: '50vh',
                bgcolor: 'black',
                width: '100%',
                mt: 0.25,
                mb: 0.25,
              }}
            >
              {/* Game info will be added here */}
            </Box>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default TeamSeasonGames;
