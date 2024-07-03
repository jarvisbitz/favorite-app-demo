import React, {useEffect} from 'react';
import {Text, View, BackHandler, Alert, Image, ScrollView} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {showMessage} from 'react-native-flash-message';

import tw from '../assets/styles/tailwind';
import AuthLayout from '../components/layout/authLayout';
import Button from '../elements/button';
import InputField from '../elements/inputField';

import {loginSchema} from '../helpers/form-validator';
import {withStateDispatch} from '../helpers/withStateDispatch';
import {EnvelopeIcon, LockClosedIcon} from 'react-native-heroicons/outline';

const LoginScreen: React.FC<any> = props => {
  const {Login, Loading, navigation} = props;

  const {handleSubmit, control, setFocus} = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginUser = (data: any) => {
    Login(
      {...data, rememberMe: true},
      () => {
        showMessage({
          message: 'Login Successfully',
          type: 'success',
        });
        navigation.replace('Dashboard');
      },
      (error: any) => {
        console.log(error);
        showMessage({
          message: error.message,
          type: 'danger',
        });
      },
    );
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
        return true;
      });
  }, []);

  return (
    <AuthLayout>
      <Animated.Image
        style={tw.style('w-full flex-0.5 lg:flex-0.6')}
        source={require('../assets/images/jetDevs.png')}
        resizeMethod="auto"
        resizeMode={'center'}
      />
      <ScrollView style={tw.style('card')}>
        <Animated.View
          style={tw.style('mb-5 lg:mb-20')}
          entering={FadeInDown.delay(500)
            .duration(1000)
            .springify()
            .damping(12)}>
          <Text
            style={tw.style(
              'font-roboto text-4xl lg:text-6xl font-extrabold text-primary text-center',
            )}>
            User Login
          </Text>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(100)
            .duration(1000)
            .springify()
            .damping(12)}
          style={tw.style('')}>
          <Controller
            control={control}
            name="email"
            render={({
              field: {name, onChange, onBlur, value, ref},
              fieldState: {error},
            }) => (
              <InputField
                ref={ref}
                name={name}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                returnKeyType="next"
                onSubmitEditing={() => setFocus('password')}
                errorData={error?.message}
                startIcon={
                  <EnvelopeIcon
                    style={tw.style('')}
                    color={
                      tw.prefixMatch('dark')
                        ? tw.color('white opacity-10')
                        : tw.color(
                            `${
                              error?.message ? 'error' : 'primary'
                            } opacity-10`,
                          )
                    }
                    size={tw.prefixMatch('tablet') ? 40 : 30}
                  />
                }
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({
              field: {name, onChange, onBlur, value, ref},
              fieldState: {error},
            }) => (
              <InputField
                ref={ref}
                name={name}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Password"
                keyboardType="default"
                autoCapitalize="none"
                errorData={error?.message}
                returnKeyType="default"
                onSubmitEditing={handleSubmit(loginUser)}
                startIcon={
                  <LockClosedIcon
                    style={tw.style('')}
                    color={
                      tw.prefixMatch('dark')
                        ? tw.color('white opacity-10')
                        : tw.color(
                            `${
                              error?.message ? 'error' : 'primary'
                            } opacity-10`,
                          )
                    }
                    size={tw.prefixMatch('tablet') ? 40 : 30}
                  />
                }
              />
            )}
          />
          <Animated.View
            entering={FadeInDown.delay(500)
              .duration(1000)
              .springify()
              .damping(12)}>
            <Button
              variant="text"
              disabled={Loading}
              textStyle={tw.style('text-right')}
              label="Forgot Password?"
              onPress={() => Alert.alert('Feature coming soon!')}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(500)
              .duration(1000)
              .springify()
              .damping(12)}
            style={tw.style('flex gap-5 mt-5 lg:mt-8')}>
            <Button
              disabled={Loading}
              label="Login"
              onPress={handleSubmit(loginUser)}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(500)
              .duration(1000)
              .springify()
              .damping(12)}
            style={tw.style('flex flex-row gap-5 items-center mt-10 lg:mt-16')}>
            <View style={tw.style('flex-1 bg-primary h-0.1 bg-opacity-10')} />
            <Text
              style={tw.style(
                'font-roboto text-base lg:text-2xl text-primary text-opacity-50',
              )}>
              Login with
            </Text>
            <View style={tw.style('flex-1 bg-primary h-0.1 bg-opacity-10')} />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(500)
              .duration(1000)
              .springify()
              .damping(12)}
            style={tw.style(
              'flex flex-row items-center justify-center gap-10 lg:gap-20 mt-5 mb-5 mx-5 lg:mt-8 lg:mx-8 lg:mb-0',
            )}>
            <Animated.View
              style={tw.style(
                'flex-initial items-center justify-center bg-white border rounded-lg border-primary border-opacity-10',
              )}
              entering={FadeInDown.delay(500)
                .duration(1000)
                .springify()
                .damping(12)}>
              <Image
                style={tw.style('w-10 h-10 lg:w-15 lg:h-15')}
                source={require('../assets/images/google.png')}
              />
            </Animated.View>
            <Animated.View
              style={tw.style(
                'flex-initial items-center justify-center bg-white border rounded-lg border-primary border-opacity-10',
              )}
              entering={FadeInDown.delay(500)
                .duration(1000)
                .springify()
                .damping(12)}>
              <Image
                style={tw.style('w-10 h-10 lg:w-15 lg:h-15')}
                source={require('../assets/images/facebook.png')}
              />
            </Animated.View>
            <Animated.View
              style={tw.style(
                'flex-initial items-center justify-center bg-white border rounded-lg border-primary border-opacity-10',
              )}
              entering={FadeInDown.delay(500)
                .duration(1000)
                .springify()
                .damping(12)}>
              <Image
                style={tw.style('w-10 h-10 lg:w-15 lg:h-15')}
                source={require('../assets/images/apple.png')}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </AuthLayout>
  );
};

export default withStateDispatch(LoginScreen);
