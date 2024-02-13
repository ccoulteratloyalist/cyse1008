import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import authReducer from './authSlice';
import productsReducer from './productsSlice';

const persistConfig = { key: "root", storage };
const usersPersistConfig = { key: "users", storage };
const productsPersistConfig = { key: "products", storage };

const reducers = combineReducers({
  users: persistReducer(usersPersistConfig, authReducer),
  products: persistReducer(productsPersistConfig, productsReducer),
});

const rootReducer = (state, action) => {
  if (action.type === "session/logout/fulfilled") {
    storage.removeItem("persist:users");
    storage.removeItem("persist:products");
    // return reducers(undefined, action);
  }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export let persistor = persistStore(store);

export default store;
