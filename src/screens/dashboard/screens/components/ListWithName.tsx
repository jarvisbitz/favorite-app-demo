import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
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
  onToggle: any;
};

const ListWithName: React.FC<ListItemProps> = React.memo(
  ({item, viewableItems, onToggle}) => {
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
            'flex flex-row gap-2 lg:gap-4 items-center px-2 py-1 lg:px-4 lg:py-2 bg-white rounded-lg',
          ),
          rStyle,
        ]}>
        <Image
          style={tw.style(
            'w-10 h-10 lg:w-20 lg:h-20 rounded-full z-10 border-2 border-white',
          )}
          source={{uri: item?.picture?.large}}
          resizeMethod="auto"
          resizeMode="contain"
        />
        <View style={tw.style('flex-1 rounded-2xl')}>
          <Text
            style={tw.style('text-base lg:text-3xl font-roboto text-primary')}>
            {item?.name?.title} {item?.name?.first} {item?.name?.last}
          </Text>
        </View>
        <Pressable
          onPress={() => onToggle(item)}
          style={tw.style('flex-initial')}>
          <StarSolidIcon
            color={tw.color('quinary')}
            size={tw.prefixMatch('tablet') ? 40 : 20}
          />
        </Pressable>
      </Animated.View>
    );
  },
);

export default withStateDispatch(ListWithName);
