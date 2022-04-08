import React from 'react';
import { ThemeProvider } from 'styled-components';
import Home from './src/pages/Home';
import { light } from './src/styles/themes';
import {
  Epilogue_500Medium,
  Epilogue_700Bold,
  useFonts,
} from '@expo-google-fonts/epilogue';

export default function App() {
  const [loadedFonts] = useFonts({
    Medium: Epilogue_500Medium,
    Bold: Epilogue_700Bold,
  });

  if (!loadedFonts) return;

  return (
    <ThemeProvider theme={light}>
      <Home />
    </ThemeProvider>
  );
}
