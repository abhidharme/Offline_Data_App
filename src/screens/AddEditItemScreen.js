import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from '../redux/itemsSlice';
import { insertItem, updateItem as updateStorageItem } from '../storage/asyncStorage';

const AddEditItemScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const item = route.params?.item || null; // Null for new item
  const [name, setName] = useState(item?.name || '');
  const [description, setDescription] = useState(item?.description || '');
  const [nameError, setNameError] = useState(''); // Error message for name
  const [descriptionError, setDescriptionError] = useState(''); // Error message for description

  const handleSave = async () => {
    setNameError('');
    setDescriptionError('');

    // Validation checks with error messages
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else if (name.length > 50) {
      setNameError('Name must be 50 characters or less');
      isValid = false;
    }

    if (!description.trim()) {
      setDescriptionError('Description is required');
      isValid = false;
    } else if (description.length > 200) {
      setDescriptionError('Description must be 200 characters or less');
      isValid = false;
    }

    // Proceed only if all validations pass
    if (!isValid) return;

    try {
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
    } catch (error) {
      setNameError('Failed to save item. Please try again.');
      console.error('Save error:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Name Input with Error Message */}
      <View>
        <TextInput
          style={[styles.input, nameError ? styles.inputError : null]} // Highlight input if error
          placeholder="Name"
          value={name}
          onChangeText={setName}
          maxLength={50}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      </View>

      {/* Description Input with Error Message */}
      <View>
        <TextInput
          style={[styles.input, descriptionError ? styles.inputError : null]} // Highlight input if error
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          maxLength={200}
          multiline
        />
        {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
      </View>

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
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default AddEditItemScreen;