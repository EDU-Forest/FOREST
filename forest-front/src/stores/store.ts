import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./user/user";
import classSlice from "./class/classInfo";
import classModalSlice from "./class/classModal";
import analysisSlice from "./analysis/analysis";

const reducers = combineReducers({
  user: userSlice,
  class: classSlice,
  classModal: classModalSlice,
  analysis: analysisSlice,
});

const persistConfig = {
  timeout: 100,
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
