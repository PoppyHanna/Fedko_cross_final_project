import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

// Use product name as a fallback key if the API does not provide an id.
const getProductKey = product => product.id ?? product.name;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;

      const existingIndex = state.items.findIndex(
        item => getProductKey(item) === getProductKey(product),
      );

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(product);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;