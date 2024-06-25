import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Avatar,
  CircularProgress,
  Typography,
} from '@mui/material';

const PaginatedTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://eldatomxapi.silverboi.me/nba/players');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching player data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const playerImageUrl = (playerId) => `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`;

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Headshot</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((player) => (
                <TableRow key={player.PLAYER_ID}>
                  <TableCell>
                    <Avatar
                      src={playerImageUrl(player.PLAYER_ID)}
                      alt={`${player.PLAYER_FIRST_NAME} ${player.PLAYER_LAST_NAME}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/player/${player.PLAYER_ID}`}>
                      {`${player.PLAYER_FIRST_NAME} ${player.PLAYER_LAST_NAME}`}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={players.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PaginatedTable;
