import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {
  StarIcon as StarOutlineIcon,
  MapPinIcon,
} from 'react-native-heroicons/outline';
import {StarIcon as StarSolidIcon} from 'react-native-heroicons/solid';

import tw from '../../../../assets/styles/tailwind';
import {withStateDispatch} from '../../../../helpers/withStateDispatch';

type ListItemProps = {
  viewableItems: Animated.SharedValue<{isViewable: boolean; item: any}[]>;
  item: {
    login: {
      md5: string;
    };
    id: {value: string};
    picture: {large: string};
    name: {title: string; first: string; last: string};
    location: {
      street: {number: number; name: string};
      city: string;
      state: string;
      country: string;
    };
    gender: string;
    favorite: boolean;
  };
  onToggleFavorite: any;
};

const ListWithDetail: React.FC<ListItemProps> = React.memo(
  ({item, viewableItems, onToggleFavorite}) => {
    const rStyle = useAnimatedStyle(() => {
      const isVisible = viewableItems.value.some(
        viewableItem =>
          viewableItem.isViewable &&
          viewableItem?.item?.login?.md5 === item?.login?.md5,
      );

      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [{scale: withTiming(isVisible ? 1 : 0.6)}],
      };
    }, [viewableItems.value]);

    return (
      <Animated.View
        style={[
          tw.style(
            'flex flex-row h-25 lg:h-36 shadow-md shadow-primary shadow-opacity-10',
          ),
          rStyle,
        ]}>
        <Image
          style={tw.style(
            'absolute top-2.5 bottom-2.5 m-auto w-20 h-20 lg:w-30 lg:h-30 rounded-full z-10 border-2 border-white',
          )}
          source={{uri: item?.picture?.large}}
          resizeMethod="auto"
          resizeMode="contain"
        />
        <View
          style={tw.style(
            'absolute left-5 lg:left-10 right-0 top-0 bottom-0 p-2 pl-18 lg:pl-24 bg-white rounded-2xl flex-row justify-between',
          )}>
          <View style={tw.style('flex gap-2 justify-center')}>
            <Text
              style={tw.style(
                'font-roboto text-lg lg:text-3xl font-bold text-primary',
              )}>
              {item?.name?.title} {item?.name?.first} {item?.name?.last}
            </Text>
            <View style={tw.style('flex items-center flex-row gap-1')}>
              <MapPinIcon
                color={tw.color('secondary opacity-60')}
                size={tw.prefixMatch('tablet') ? 24 : 15}
              />
              <Text
                style={tw.style(
                  'font-roboto text-sm lg:text-2xl text-secondary text-opacity-60',
                )}>
                {item?.location?.city}, {item?.location?.state},{' '}
                {item?.location?.country}
              </Text>
            </View>
            <View style={tw.style('flex flex-row')}>
              <View
                style={tw.style(
                  'bg-opacity-20 px-1 py-0.5 lg:px-2 lg:py-1 rounded-sm lg:rounded-lg',
                  {
                    'bg-tertiary': item?.gender?.toUpperCase() === 'MALE',
                    'bg-error': item?.gender?.toUpperCase() === 'FEMALE',
                  },
                )}>
                <Text
                  style={tw.style('font-roboto text-[10px] lg:text-sm', {
                    'text-tertiary': item?.gender?.toUpperCase() === 'MALE',
                    'text-error': item?.gender?.toUpperCase() === 'FEMALE',
                  })}>
                  {item?.gender?.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            onPress={() => onToggleFavorite(item)}
            style={tw.style('')}>
            {item?.favorite ? (
              <StarSolidIcon
                color={tw.color('quinary')}
                size={tw.prefixMatch('tablet') ? 40 : 20}
              />
            ) : (
              <StarOutlineIcon
                color={tw.color('quinary')}
                size={tw.prefixMatch('tablet') ? 40 : 20}
              />
            )}
          </Pressable>
        </View>
      </Animated.View>
    );
  },
);

export default withStateDispatch(ListWithDetail);
