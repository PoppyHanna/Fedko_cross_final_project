import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  appliedPromo: null,
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

    applyPromo: (state, action) => {
      state.appliedPromo = action.payload;
    },

    removePromo: state => {
      state.appliedPromo = null;
    },

    clearCart: state => {
  state.items = [];
  state.appliedPromo = null;
},
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  updateSize,
  applyPromo,
  removePromo,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;