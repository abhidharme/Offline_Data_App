import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from '../redux/itemsSlice';
import { insertItem, updateItem as updateStorageItem } from '../storage/asyncStorage';

const AddEditItemScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const item = route.params?.item || null; // Null for new item
  const [name, setName] = useState(item?.name || '');
  const [description, setDescription] = useState(item?.description || '');

  // Handle save (create or update)
  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    if (item) {
      // Update existing item
      await updateStorageItem(item.id, name, description);
      dispatch(updateItem({ id: item.id, name, description }));
    } else {
      // Add new item
      const newItem = await insertItem(name, description);
      dispatch(addItem(newItem));
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddEditItemScreen;