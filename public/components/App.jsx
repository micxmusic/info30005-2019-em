import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import AppBar from './AppBar';
import Routes from './Routes';
import GlobalTheme from '../GlobalTheme';

function App() {
  return (
    <ThemeProvider theme={GlobalTheme}>
      <CssBaseline />
      <AppBar />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
