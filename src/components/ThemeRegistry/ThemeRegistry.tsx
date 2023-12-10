'use client';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';

export default function ThemeRegistry({ children }: Readonly<{ children: React.ReactNode }>) {

  const theme = createTheme({
    palette: {
      primary: {
        light: '#9575cd',
        main: '#673ab7',
        dark: '#512da8',
        contrastText: '#fff',
      },
      secondary: {
        light: '#b39ddb',
        main: '#512da8',
        dark: '#311b92',
        contrastText: '#fff',
      },
    },
  });
  
  

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
