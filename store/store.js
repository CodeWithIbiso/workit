import {  configureStore } from '@reduxjs/toolkit'
import { appSlice } from './app' 
import { persistReducer, persistStore,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

 
const persistConfig = {
  key: 'root',
  version: 1,
  storage : AsyncStorage,
}
 

const persistedReducer = persistReducer(persistConfig, appSlice.reducer)

export const store = configureStore({ 
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }), 
})

export const persistor = persistStore(store)