/**
 * Shopping Cart App
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, useColorScheme, Platform, I18nManager} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProvider, useApp} from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const {isRTL} = useApp();

  useEffect(() => {
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      // On Android, we need to restart the app for RTL changes to take effect
      if (Platform.OS === 'android') {
        // Note: In production, you might want to use a library like react-native-restart
        // For now, the change will apply on next app restart
      }
    }
  }, [isRTL]);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent={Platform.OS === 'android'}
        backgroundColor="transparent"
      />
      <AppNavigator />
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;
