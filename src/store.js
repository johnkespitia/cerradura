import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './store/userSlice'
import guardReducer from './store/guardSlice'
import rolesReducer from './store/rolesSlice'
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query'
//import { productsApi } from '../services/products'

import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'shop-persist',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  guard: guardReducer,
  roles: rolesReducer
  //[productsApi.reducerPath]: productsApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})
setupListeners(store.dispatch)
export const persistor = persistStore(store)
