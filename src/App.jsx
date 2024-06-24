import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import PaginatedTable from './components/PaginatedTable';
import PlayerDetail from './components/PlayerDetail';
import { darkTheme } from './darkTheme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<PaginatedTable />} />
            <Route path="/player/:id" element={<PlayerDetail />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
