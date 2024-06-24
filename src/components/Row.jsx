import React, { useState } from 'react';
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Avatar,
  IconButton,
  Table,
  TableBody,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import HexBinPlot from './HexBinPlot';

const playerImageUrl = (playerId) => `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`;
const teamLogoUrl = (teamId) => `https://cdn.nba.com/logos/nba/${teamId}/global/D/logo.svg`;

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Avatar src={playerImageUrl(row.playerId)} />
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>
          <img src={teamLogoUrl(row.teamId)} alt={row.team} style={{ height: 40 }} />
        </TableCell>
        <TableCell>{row.season}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom>
                Detailed Statistics
              </Typography>
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>BPM</TableCell>
                    <TableCell>{row.stats.bpm}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>RAPM</TableCell>
                    <TableCell>{row.stats.rapm}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>RAPTOR</TableCell>
                    <TableCell>{row.stats.raptor}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Shotchart</TableCell>
                    <TableCell>
                      <HexBinPlot data={row.shotchartData} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;

