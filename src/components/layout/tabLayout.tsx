import React from 'react';
import {Text, View, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import tw from '../../assets/styles/tailwind';
import {
  HomeIcon as HomeIconSolid,
  StarIcon as StarIconSolid,
} from 'react-native-heroicons/solid';
import {
  HomeIcon as HomeIconOutlined,
  StarIcon as StarIconOutlined,
} from 'react-native-heroicons/outline';

const BottomTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <>
      <View style={tw.style('flex-row bg-white shadow-xl shadow-primary')}>
        {state.routes.map(
          (
            route: {key: string | number; name: any},
            index: React.Key | null | undefined,
          ) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <Pressable
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={tw.style(
                  'flex-1 flex items-center justify-center py-2 pb-4 lg:py-4 lg:pb-6',
                )}>
                {label === 'Home' &&
                  (isFocused ? (
                    <HomeIconSolid
                      color={tw.color('quinary')}
                      size={tw.prefixMatch('tablet') ? 45 : 30}
                    />
                  ) : (
                    <HomeIconOutlined
                      color={tw.color('quinary opacity-50')}
                      size={tw.prefixMatch('tablet') ? 45 : 30}
                    />
                  ))}
                {label === 'Favorite' &&
                  (isFocused ? (
                    <StarIconSolid
                      color={tw.color('quinary')}
                      size={tw.prefixMatch('tablet') ? 45 : 30}
                    />
                  ) : (
                    <StarIconOutlined
                      color={tw.color('quinary opacity-50')}
                      size={tw.prefixMatch('tablet') ? 45 : 30}
                    />
                  ))}
                <Text
                  style={tw.style(
                    'text-center font-roboto text-quinary text-base lg:text-xl',
                    {
                      'font-bold': isFocused,
                      'text-opacity-50': !isFocused,
                    },
                  )}>
                  {label}
                </Text>
              </Pressable>
            );
          },
        )}
      </View>
    </>
  );
};

BottomTabBar.propTypes = {
  state: PropTypes.object,
  descriptors: PropTypes.object,
  navigation: PropTypes.object,
};

export default BottomTabBar;
