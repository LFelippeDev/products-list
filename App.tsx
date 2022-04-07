import React from 'react';
import { ThemeProvider } from 'styled-components';
import Home from './pages/Home';
import { light } from './styles/themes';

export default function App() {
  return (
    <ThemeProvider theme={light}>
      <Home />
    </ThemeProvider>
  );
}
