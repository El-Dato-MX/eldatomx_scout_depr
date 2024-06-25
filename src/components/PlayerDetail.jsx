import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Avatar, CircularProgress, Paper, Grid } from '@mui/material';
import HexBinPlot from './HexBinPlot';

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [shotChartData, setShotChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      try {
        setLoading(true);
        const [playerResponse, shotChartResponse] = await Promise.all([
          fetch(`https://eldatomxapi.silverboi.me/nba/players/id/${id}`),
          fetch(`https://eldatomxapi.silverboi.me/nba/player_shotchart/id/${id}`)
        ]);

        if (!playerResponse.ok || !shotChartResponse.ok) {
          throw new Error(`HTTP error! status: ${playerResponse.status} ${shotChartResponse.status}`);
        }

        const [playerData, shotChartData] = await Promise.all([
          playerResponse.json(),
          shotChartResponse.json()
        ]);

        setPlayer(playerData);
        setShotChartData(shotChartData);
      } catch (error) {
        console.error('Error fetching player details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerDetails();
  }, [id]);

  const playerImageUrl = (playerId) => `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`;

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!player) {
    return <Typography>No player data found</Typography>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Avatar
            src={playerImageUrl(player.PLAYER_ID)}
            alt={`${player.PLAYER_FIRST_NAME} ${player.PLAYER_LAST_NAME}`}
            sx={{ width: 200, height: 200, mb: 2 }}
          />
          <Typography variant="h4">{`${player.PLAYER_FIRST_NAME} ${player.PLAYER_LAST_NAME}`}</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6">Statistics</Typography>
          <Typography>BPM: {player.BPM}</Typography>
          <Typography>RAPM: {player.RAPM}</Typography>
          <Typography>RAPTOR: {player.RAPTOR}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Shot Chart</Typography>
          <HexBinPlot data={shotChartData} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PlayerDetail;
