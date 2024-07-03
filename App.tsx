import React from 'react';
import {Platform, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import LoginScreen from './src/screens/Login';
import SplashScreen from './src/screens/Splash';
import tw from './src/assets/styles/tailwind';
import {useDeviceContext} from 'twrnc';
import {persistor, store} from './src/api/store';
import DashboardScreen from './src/screens/dashboard';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useDeviceContext(tw, {
    initialColorScheme: 'light',
    observeDeviceColorSchemeChanges: false,
  });

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading</Text>} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              gestureEnabled: Platform.OS === 'ios',
            }}>
            <Stack.Group>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage position="top" style={tw.style('z-20')} />
      </PersistGate>
    </Provider>
  );
}

export default App;
