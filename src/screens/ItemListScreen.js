import React, { useEffect } from 'react';
import { View, FlatList, Button, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setItems, removeItem } from '../redux/itemsSlice';
import { fetchItems, deleteItem } from '../storage/asyncStorage';
import Item from '../components/Item';

const ItemListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);

  // Load items from AsyncStorage on mount
  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await fetchItems();
      dispatch(setItems(storedItems));
    };
    loadItems();
  }, [dispatch]);

  // Handle item deletion
  const handleDelete = async (id) => {
    await deleteItem(id);
    dispatch(removeItem(id));
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add New Item"
        onPress={() => navigation.navigate('AddEditItemScreen', { item: null })}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Item
            item={item}
            onEdit={() => navigation.navigate('AddEditItemScreen', { item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={<View><Text>No items yet</Text></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default ItemListScreen;