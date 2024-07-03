import React, {useState, forwardRef} from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';

import * as Icons from 'react-native-heroicons/outline';
import tw from '../assets/styles/tailwind';

interface InputFieldProps extends TextInputProps {
  label?: string;
  name?: string;
  startIcon?: any;
  errorData?: string;
}

const InputField = forwardRef<TextInput, InputFieldProps>(
  ({label, errorData, ...props}, ref) => {
    const [showPassword, setShowPassword] = useState(true);
    const {name, startIcon, ...rest} = props;

    return (
      <Animated.View
        entering={FadeInDown.delay(200).duration(1000).springify().damping(12)}
        style={tw.style('flex')}>
        {label && (
          <Text style={tw.style('text-sm text-tertiary font-roboto')}>
            {label}
          </Text>
        )}
        <View
          style={tw.style(
            'flex flex-row gap-2 items-center rounded-xl border border-primary border-opacity-10 p-2',
          )}>
          {startIcon}
          <TextInput
            ref={ref}
            style={[
              tw.style(
                'flex-1 leading-tight text-base lg:text-xl font-roboto text-primary px-2 py-3 lg:px-4 lg:py-6',
              ),
              errorData ? tw.style('border-error border-opacity-20') : {},
              rest.multiline ? tw.style('h-30 align-top') : {},
            ]}
            placeholderTextColor={
              tw.prefixMatch('dark')
                ? tw.color(
                    `${errorData ? 'text-error' : 'text-white'} opacity-50`,
                  )
                : tw.color(
                    `${errorData ? 'text-error' : 'text-primary'} opacity-50`,
                  )
            }
            {...rest}
            {...(name === 'password' && {
              secureTextEntry: showPassword,
            })}
          />
          {name === 'password' && (
            <Icons.EyeIcon
              style={tw.style('')}
              color={
                tw.prefixMatch('dark')
                  ? tw.color('white opacity-50')
                  : tw.color(`${errorData ? 'error' : 'primary'} opacity-10`)
              }
              size={tw.prefixMatch('tablet') ? 40 : 30}
              onPress={() => setShowPassword(!showPassword)}
            />
          )}
        </View>
        <Text
          style={tw.style(
            'h-5 lg:h-8 font-roboto text-xs lg:text-lg text-error text-opacity-70',
          )}>
          {errorData}
        </Text>
      </Animated.View>
    );
  },
);

export default InputField;
