import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';

export interface NavigationRef {
  navigate: (screen: string) => void;
  goBack: () => void;
}

// Simple stack navigator component
const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = React.useState<'Home' | 'Cart'>('Home');

  const navigation: NavigationRef = {
    navigate: (screen: string) => {
      if (screen === 'Cart' || screen === 'Home') {
        setCurrentScreen(screen);
      }
    },
    goBack: () => {
      setCurrentScreen('Home');
    },
  };

  return (
    <>
      {currentScreen === 'Home' && <HomeScreen navigation={navigation} />}
      {currentScreen === 'Cart' && <CartScreen navigation={navigation} />}
    </>
  );
};

export default AppNavigator;
