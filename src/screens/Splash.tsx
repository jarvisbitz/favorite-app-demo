import React, {useLayoutEffect} from 'react';
import {Text, View} from 'react-native';
import tw from '../assets/styles/tailwind';
import {store} from '../api/store';
import Animated from 'react-native-reanimated';

const SplashScreen: React.FC<any> = props => {
  const {navigation} = props;

  useLayoutEffect(() => {
    const token = store.getState()?.auth?.token;
    const timeout = setInterval(() => {
      if (token) {
        navigation.replace('Dashboard');
      } else {
        navigation.replace('Login');
      }
    }, 2000);
    return () => clearInterval(timeout);
  }, [navigation]);

  return (
    <View style={tw.style('flex-1')}>
      <View style={tw.style('flex-1 w-full gap-3 items-center justify-center')}>
        <Animated.Image
          style={tw.style('w-[80%] h-50')}
          source={require('../assets/images/jetDevs.png')}
          resizeMethod="auto"
          resizeMode="contain"
        />
      </View>
      <View style={tw.style('flex items-center justify-center w-full mb-5')}>
        <Text style={tw.style('font-roboto text-sm lg:text-xl text-secondary')}>
          Powered By JarvisBitz Tech
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
