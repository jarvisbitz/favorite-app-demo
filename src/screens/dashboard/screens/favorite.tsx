import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
  ViewToken,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

import {withStateDispatch} from '../../../helpers/withStateDispatch';
import Layout from '../../../components/layout';
import tw from '../../../assets/styles/tailwind';
import ListWithName from './components/ListWithName';

const FavoriteScreen: React.FC<any> = props => {
  const {Favorite, RemoveFavorite} = props;

  const viewableItems = useSharedValue<ViewToken[]>([]);
  const [data, setData] = useState([]);

  const UpdateData = useCallback(() => {
    setData(Favorite.filter((item: any) => item.favorite));
  }, [Favorite]);

  const handleFavorite = useCallback(
    (item: any) => {
      RemoveFavorite(
        item,
        () => {
          UpdateData();
        },
        () => {},
      );
    },
    [RemoveFavorite, UpdateData],
  );

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<any>) => (
      <ListWithName
        item={item}
        viewableItems={viewableItems}
        onToggle={handleFavorite}
      />
    ),
    [handleFavorite, viewableItems],
  );

  useEffect(() => {
    UpdateData();
  }, [UpdateData]);

  return (
    <Layout>
      <View style={tw.style('w-full flex-1 mt-5')}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            onViewableItemsChanged={({viewableItems: vItems}) => {
              viewableItems.value = vItems;
            }}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            contentContainerStyle={tw.style('px-5 gap-2 lg:gap-4')}
            scrollEventThrottle={16}
          />
        ) : (
          <Text
            style={tw.style(
              'text-secondary text-center text-base lg:text-3xl',
            )}>
            No Favorite found
          </Text>
        )}
      </View>
    </Layout>
  );
};

export default withStateDispatch(FavoriteScreen);
