import AsyncStorage from '@react-native-async-storage/async-storage';

// Key for storing items in AsyncStorage
const ITEMS_KEY = '@items';

// Fetch all items from storage
export const fetchItems = async () => {
  try {
    const itemsJson = await AsyncStorage.getItem(ITEMS_KEY);
    return itemsJson ? JSON.parse(itemsJson) : [];
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};

// Save items to storage
export const saveItems = async (items) => {
  try {
    await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving items:', error);
  }
};

// Add a new item
export const insertItem = async (name, description) => {
  const items = await fetchItems();
  const newItem = {
    id: Date.now(), // Simple unique ID based on timestamp
    name,
    description,
  };
  const updatedItems = [...items, newItem];
  await saveItems(updatedItems);
  return newItem;
};

// Update an existing item
export const updateItem = async (id, name, description) => {
  const items = await fetchItems();
  const updatedItems = items.map((item) =>
    item.id === id ? { ...item, name, description } : item
  );
  await saveItems(updatedItems);
};

// Delete an item by ID
export const deleteItem = async (id) => {
  const items = await fetchItems();
  const updatedItems = items.filter((item) => item.id !== id);
  await saveItems(updatedItems);
};