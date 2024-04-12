import React, {useMemo, useCallback, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {useQuery} from 'react-query';
import fetchData from '../hooks/getData';
import {ListItem, Loading, Error} from '../layouts/lists';
import ItemDetails from '../componets/itemDetails';
import {heavyComputation} from '../functions/heavyComputation';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemId, setItemId] = useState();

  // Function to toggle modal visibility
  const toggleModal = useCallback(itemId => {
    setItemId(itemId);
    setModalVisible(prev => !prev);
  }, []);

  // Fetch data using React Query hook
  const {isLoading, isError, data, error} = useQuery('posts', () =>
    fetchData({url: 'posts'}),
  );

  // Callback function to render each item in the FlatList
  const renderItem = useCallback(
    ({item}) => {
      // Compute heavy details for each item
      const computedDetails = heavyComputation(item);
      return (
        <ListItem
          item={item}
          onPress={toggleModal}
          computedDetails={computedDetails}
        />
      );
    },
    [toggleModal], // Dependence on toggleModal to avoid unnecessary re-renders
  );

  // Callback function to extract unique keys for each item in the FlatList
  const keyExtractor = useCallback(item => item.id.toString(), []);

  // Memoized FlatList component to optimize rendering performance
  const memoizedFlatList = useMemo(
    () => (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    ),
    [data, renderItem, keyExtractor], // Dependence on data, renderItem, and keyExtractor to avoid unnecessary re-renders
  );

  return (
    <SafeAreaView>
      {isLoading && Loading()}
      {isError && Error(error)}
      {memoizedFlatList}
      <ItemDetails
        isVisible={modalVisible}
        onClose={toggleModal}
        itemId={itemId}
      />
    </SafeAreaView>
  );
};

export default Home;
