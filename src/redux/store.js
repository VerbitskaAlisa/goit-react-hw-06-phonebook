import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from "./filterSlice";


export const rootReducer = combineReducers({
    contacts: contactsReducer,
    filter: filterReducer,
  });
 
const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};

const persistedContactsReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedContactsReducer,

    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        });
      },
})

export const persistor = persistStore(store);
