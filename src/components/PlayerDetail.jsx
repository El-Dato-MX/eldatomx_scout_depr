import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Avatar, CircularProgress, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
  const teamLogoUrl = (teamId) => `https://cdn.nba.com/logos/nba/${teamId}/global/D/logo.svg`;

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
        {/* Leftmost third */}
        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Avatar
              src={playerImageUrl(player.PLAYER_ID)}
              alt={`${player.PLAYER_FIRST_NAME} ${player.PLAYER_LAST_NAME}`}
              sx={{ width: '100%', height: 'auto', mb: 2 }}
            />
            <img
              src={teamLogoUrl(player.TEAM_ID)}
              alt={player.TEAM_NAME}
              style={{ position: 'absolute', top: '10px', right: '10px', width: '50px', height: '50px' }}
            />
          </div>
          <Typography variant="h6">Season Games</Typography>
          <div style={{ height: '200px', background: '#f0f0f0', width: '100%' }}>Placeholder for season games</div>
        </Grid>

        {/* Center and rightmost third */}
        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6">Shot Chart</Typography>
          <div style={{ width: '100%', height: '100%' }}>
            <HexBinPlot data={shotChartData} />
          </div>
        </Grid>

        {/* Bottom half for game stats */}
        <Grid item xs={12}>
          <Typography variant="h6">Game Stats</Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>SEASON_ID</TableCell>
                  <TableCell>Player_ID</TableCell>
                  <TableCell>Game_ID</TableCell>
                  <TableCell>GAME_DATE</TableCell>
                  <TableCell>MATCHUP</TableCell>
                  <TableCell>WL</TableCell>
                  <TableCell>MIN</TableCell>
                  <TableCell>FGM</TableCell>
                  <TableCell>FGA</TableCell>
                  <TableCell>FG_PCT</TableCell>
                  <TableCell>FG3M</TableCell>
                  <TableCell>FG3A</TableCell>
                  <TableCell>FG3_PCT</TableCell>
                  <TableCell>FTM</TableCell>
                  <TableCell>FTA</TableCell>
                  <TableCell>FT_PCT</TableCell>
                  <TableCell>OREB</TableCell>
                  <TableCell>DREB</TableCell>
                  <TableCell>REB</TableCell>
                  <TableCell>AST</TableCell>
                  <TableCell>STL</TableCell>
                  <TableCell>BLK</TableCell>
                  <TableCell>TOV</TableCell>
                  <TableCell>PF</TableCell>
                  <TableCell>PTS</TableCell>
                  <TableCell>PLUS_MINUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(player.stats) && player.stats.map((stat, index) => (
                  <TableRow key={index}>
                    <TableCell>{stat.SEASON_ID}</TableCell>
                    <TableCell>{stat.Player_ID}</TableCell>
                    <TableCell>{stat.Game_ID}</TableCell>
                    <TableCell>{stat.GAME_DATE}</TableCell>
                    <TableCell>{stat.MATCHUP}</TableCell>
                    <TableCell>{stat.WL}</TableCell>
                    <TableCell>{stat.MIN}</TableCell>
                    <TableCell>{stat.FGM}</TableCell>
                    <TableCell>{stat.FGA}</TableCell>
                    <TableCell>{stat.FG_PCT}</TableCell>
                    <TableCell>{stat.FG3M}</TableCell>
                    <TableCell>{stat.FG3A}</TableCell>
                    <TableCell>{stat.FG3_PCT}</TableCell>
                    <TableCell>{stat.FTM}</TableCell>
                    <TableCell>{stat.FTA}</TableCell>
                    <TableCell>{stat.FT_PCT}</TableCell>
                    <TableCell>{stat.OREB}</TableCell>
                    <TableCell>{stat.DREB}</TableCell>
                    <TableCell>{stat.REB}</TableCell>
                    <TableCell>{stat.AST}</TableCell>
                    <TableCell>{stat.STL}</TableCell>
                    <TableCell>{stat.BLK}</TableCell>
                    <TableCell>{stat.TOV}</TableCell>
                    <TableCell>{stat.PF}</TableCell>
                    <TableCell>{stat.PTS}</TableCell>
                    <TableCell>{stat.PLUS_MINUS}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PlayerDetail;

