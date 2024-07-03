import React from 'react';
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import tw from '../../assets/styles/tailwind';
import {useAppColorScheme} from 'twrnc';

const AuthLayout: React.FC<any> = ({children}) => {
  const [colorScheme] = useAppColorScheme(tw);
  const isDarkMode = colorScheme === 'dark';

  return (
    <>
      <StatusBar
        animated
        hidden={Platform.OS === 'android'}
        backgroundColor={tw.color('bg-white dark:bg-primary')}
        barStyle={!isDarkMode ? 'light-content' : 'dark-content'}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw.style('flex-1')}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={tw.style('flex-1 bg-borderColor')}>{children}</View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default AuthLayout;
