import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";

import authReducer from "./features/authSlice";
import gameReducer from "./features/gameSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // We add here what does not change frequently
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
