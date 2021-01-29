import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

//import AppTab from './src/Shared/AppTab';
import AppTabModal from './src/Shared/AppTabModal';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

export default function App() {
  const statusBar = true;
  return (
    <PaperProvider theme={theme}>
      <AppTabModal />
      { statusBar && <StatusBar style="light" />}
    </PaperProvider>
  );
}