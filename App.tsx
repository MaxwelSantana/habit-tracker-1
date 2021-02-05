import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AppTab from './src/navigation/AppTab';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1F8DFC',
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