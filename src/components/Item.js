import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Item = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {item.name} - {item.description}
      </Text>
      <View style={styles.buttons}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default Item;