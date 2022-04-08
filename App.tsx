import React from 'react';
import { ThemeProvider } from 'styled-components';
import Home from './src/pages/Home';
import { light } from './src/styles/themes';

export default function App() {
  return (
    <ThemeProvider theme={light}>
      <Home />
    </ThemeProvider>
  );
}
