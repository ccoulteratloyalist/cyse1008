import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../apis/firebase'; // Adjust the import path to your Firebase config

// Async thunk for listing products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
});

// Async thunk for creating a new product
export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
  const docRef = await addDoc(collection(db, 'products'), newProduct);
  return { id: docRef.id, ...newProduct };
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add fetched products to the state
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the new product to the state
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
