import React from 'react';
import {Pressable, Text, TextStyle, ViewStyle} from 'react-native';
import tw from '../assets/styles/tailwind';

interface ButtonProps {
  variant?: 'button' | 'text';
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  onPress: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'button',
  textStyle,
  buttonStyle,
  disabled = false,
  onPress,
  label,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      style={({pressed}) => [
        variant === 'button' && tw.style('bg-quinary rounded-xl py-3 lg:py-5'),
        variant === 'text' && tw.style(''),
        variant === 'button' && pressed
          ? tw.style('')
          : tw.style('android:shadow-md ios:shadow-xl shadow-quinary'),
        disabled && tw.style('opacity-50'),
        buttonStyle,
      ]}>
      <Text
        style={[
          variant === 'button' &&
            tw.style(
              'text-xl lg:text-4xl font-roboto font-bold text-center text-white',
            ),
          variant === 'text' &&
            tw.style('text-base lg:text-2xl font-roboto text-quinary'),
          textStyle,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default React.memo(Button);
