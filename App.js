import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AppTab from './AppTab';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

export default function App() {
  const statusBar = false;
  return (
    <PaperProvider theme={theme}>
      <AppTab />
      { statusBar && <StatusBar style="light" />}
    </PaperProvider>
  );
}