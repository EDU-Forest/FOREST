import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import teacherClassSlice from "./teacher/teacherClass";

const reducers = combineReducers({
  teacherClass: teacherClassSlice,
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
