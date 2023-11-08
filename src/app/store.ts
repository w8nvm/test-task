import {configureStore, combineReducers} from '@reduxjs/toolkit';
import auth from '../features/auth/authSlice'
import users from '../features/users/usersSlice'
import {api} from "./services/api";
import {listenerMiddleware} from "../middleware/auth";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth,
  users
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware)
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;