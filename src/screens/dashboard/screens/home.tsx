import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  ListRenderItemInfo,
  ViewToken,
  ActivityIndicator,
} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

import Layout from '../../../components/layout';
import tw from '../../../assets/styles/tailwind';
import ListWithDetail from './components/ListWithDetail';
import {withStateDispatch} from '../../../helpers/withStateDispatch';

interface HomeScreenProps {
  List: (
    params: {results: number; page: number},
    onSuccess: (response: any) => void,
    onError: (error: any) => void,
  ) => void;
  // Add props for Redux favorites
  Favorite: any[]; // Adjust the type according to your Redux state structure
  AddFavorite: (
    item: any,
    onSuccess: () => void,
    onError: (error: any) => void,
  ) => void; // Adjust type as needed
  RemoveFavorite: (
    item: any,
    onSuccess: () => void,
    onError: (error: any) => void,
  ) => void; // Adjust type as needed
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  List,
  Favorite, // Retrieve Favorite from props
  AddFavorite,
  RemoveFavorite,
}) => {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const mergeFavorites = (items: any[], favorites: any[]) => {
    const favoriteIds = new Set(favorites.map(fav => fav.login.md5));
    return items.map(item => ({
      ...item,
      favorite:
        (favoriteIds.has(item.login.md5) &&
          favorites.find(fav => fav.login.md5 === item.login.md5)?.favorite) ||
        false,
    }));
  };

  const fetchData = useCallback(
    (pageNumber: number, isRefreshing = false) => {
      if (loading || (!isRefreshing && !hasMore)) {
        return;
      }

      setLoading(true);

      List(
        {results: 10, page: pageNumber},
        (response: any) => {
          const updatedResponse = mergeFavorites(response, Favorite);
          setData(prevData =>
            isRefreshing ? updatedResponse : [...prevData, ...updatedResponse],
          );
          setLoading(false);
          setRefreshing(false);
          setHasMore(response.length > 0); // Assuming API returns an empty array when no more data
        },
        (error: any) => {
          console.error(error);
          setLoading(false);
          setRefreshing(false);
        },
      );
    },
    [loading, hasMore, List, Favorite],
  );

  const handleFavorite = useCallback(
    (item: any) => {
      if (item?.favorite) {
        RemoveFavorite(
          {...item, favorite: false},
          () => {
            setData(prevData =>
              prevData.map(d =>
                d.login.md5 === item.login.md5 ? {...d, favorite: false} : d,
              ),
            );
          },
          () => {},
        );
      } else {
        AddFavorite(
          {...item, favorite: true},
          () => {
            setData(prevData =>
              prevData.map(d =>
                d.login.md5 === item.login.md5 ? {...d, favorite: true} : d,
              ),
            );
          },
          () => {},
        );
      }
    },
    [AddFavorite, RemoveFavorite],
  );

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Update data when Favorite changes
  useEffect(() => {
    setData(prevData => mergeFavorites(prevData, Favorite));
  }, [Favorite]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchData(1, true);
  }, [fetchData]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [loading, hasMore]);

  const renderFooter = useCallback(() => {
    if (!loading) {
      return null;
    }
    return (
      <View style={tw.style('flex items-center justify-center py-10')}>
        <ActivityIndicator color={tw.color('primary')} />
      </View>
    );
  }, [loading]);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<any>) => (
      <ListWithDetail
        item={item}
        viewableItems={viewableItems}
        onToggleFavorite={() => handleFavorite(item)}
      />
    ),
    [handleFavorite, viewableItems],
  );

  return (
    <Layout>
      <View style={tw.style('flex-1 w-full mt-5')}>
        <FlatList
          data={data}
          onViewableItemsChanged={({viewableItems: vItems}) => {
            viewableItems.value = vItems;
          }}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          contentContainerStyle={tw.style('px-4 lg:px-8 gap-5')}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          scrollEventThrottle={16}
        />
      </View>
    </Layout>
  );
};

export default withStateDispatch(HomeScreen);
