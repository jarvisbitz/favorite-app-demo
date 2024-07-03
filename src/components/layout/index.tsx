import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppColorScheme} from 'twrnc';

import tw from '../../assets/styles/tailwind';
import {withStateDispatch} from '../../helpers/withStateDispatch';
import {ArrowLeftStartOnRectangleIcon} from 'react-native-heroicons/outline';
import {store} from '../../api/store';
import {LOGOUT} from '../../api/constants';

const Layout: React.FC<any> = ({children, containerStyle, footer}) => {
  const [colorScheme] = useAppColorScheme(tw);
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation<any>();

  return (
    <View style={tw.style('flex-1 bg-white')}>
      <StatusBar
        animated
        // hidden={Platform.OS === 'android'}
        backgroundColor={tw.color('white')}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <SafeAreaView
        style={tw.style('flex-1', {
          paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        })}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={tw.style('flex-1')}>
          <View
            style={[
              tw.style('flex-1 items-center justify-center bg-borderColor'),
              tw.style(containerStyle),
            ]}>
            <View
              style={tw.style(
                'w-full flex flex-row items-center justify-between bg-white px-5 android:pt-5',
              )}>
              <View />
              <Image
                style={tw.style('w-30 h-10 lg:w-50 lg:h-24')}
                source={require('../../assets/images/jetDevs.png')}
                resizeMethod="auto"
                resizeMode="contain"
              />
              <Pressable
                onPress={() => {
                  store.dispatch({type: LOGOUT});
                  navigation.replace('Login');
                }}>
                <ArrowLeftStartOnRectangleIcon
                  color={tw.color('error')}
                  size={tw.prefixMatch('tablet') ? 40 : 25}
                />
              </Pressable>
            </View>
            {children}
            {footer}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default withStateDispatch(Layout);
