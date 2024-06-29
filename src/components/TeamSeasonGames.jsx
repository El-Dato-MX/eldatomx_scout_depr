import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const GameCard = ({ game, isSelected, onSelect }) => {
  const teamLogoUrl = (teamId) => `https://cdn.nba.com/logos/nba/${teamId}/global/L/logo.svg`;

  const isHomeGame = game.MATCHUP.includes('vs.');
  const homeAwayText = isHomeGame ? 'vs.' : '@';

  return (
    <Card 
      sx={{ 
        width: 80,
        height: 80,
        m: 0.5,
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
      <CardContent sx={{ position: 'relative', zIndex: 1, p: 1 }}>
        <Typography variant="body2" color={game.WL === 'W' ? 'success.main' : 'error.main'} fontWeight="bold">
          {game.WL}
        </Typography>
        <Typography variant="caption" color='#000'>
          {homeAwayText}
        </Typography>
      </CardContent>
    </Card>
  );
};

const TeamSeasonGames = ({ games, selectedGameId, onGameSelect }) => {
  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      <Grid container spacing={1} justifyContent="flex-start">
        {games.map((game) => (
          <Grid item key={game.GAME_ID}>
            <GameCard 
              game={game} 
              isSelected={game.GAME_ID === selectedGameId}
              onSelect={onGameSelect}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamSeasonGames;
