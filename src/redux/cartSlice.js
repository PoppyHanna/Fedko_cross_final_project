import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },

    removeItem: (state, action) => {
      state.items.splice(action.payload, 1);
    },

    updateQuantity: (state, action) => {
      const { index, quantity } = action.payload;

      if (state.items[index]) {
        state.items[index].quantity = quantity;
      }
    },

    updateSize: (state, action) => { 
      const { index, size, price } = action.payload;

      if (state.items[index]) {
        state.items[index].size = size;
        state.items[index].price = price;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  updateSize,
} = cartSlice.actions;

export default cartSlice.reducer;