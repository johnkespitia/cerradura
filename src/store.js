import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './store/userSlice'
import guardReducer from './store/guardSlice'
import rolesReducer from './store/rolesSlice'
import permissionsReducer from './store/PermissionSlice'
import accountsReducer from './store/AccountSlice'
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query'

import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'shop-persist',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  guard: guardReducer,
  roles: rolesReducer,
  accounts: accountsReducer,
  permissions: permissionsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})
setupListeners(store.dispatch)
export const persistor = persistStore(store)
