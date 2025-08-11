import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import productsReducer from './productsSlice';
import inventoryReducer from './inventorySlice';

const inventoryPersistConfig = {
  key: 'inventory',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  products: productsReducer,
  inventory: persistReducer(inventoryPersistConfig, inventoryReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;