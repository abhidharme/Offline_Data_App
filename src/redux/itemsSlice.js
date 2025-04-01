import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [], // Array to hold items
  },
  reducers: {
    // Set all items (e.g., on app load)
    setItems: (state, action) => {
      state.items = action.payload;
    },
    // Add a new item to the state
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    // Update an existing item
    updateItem: (state, action) => {
      const { id, name, description } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], name, description };
      }
    },
    // Remove an item by ID
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setItems, addItem, updateItem, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;