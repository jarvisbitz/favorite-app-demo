import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/home';
import FavoriteScreen from './screens/favorite';
import tw from '../../assets/styles/tailwind';
import TabBar from '../../components/layout/tabLayout';

const Tab = createBottomTabNavigator();

const DashboardScreen: React.FC<any> = () => {
  return (
    <Tab.Navigator
      key={tw.memoBuster}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={TabBar}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
