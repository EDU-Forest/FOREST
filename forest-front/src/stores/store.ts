import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import teacherClassSlice from "./teacher/teacherClass";
import analysisSlice from "./analysis/analysis";
import teacherModalControlSlice from "./teacher/teacherModalControl";
import studentModalControlSlice from "./student/studentModalControl";

const reducers = combineReducers({
  teacherClass: teacherClassSlice,
  analysis: analysisSlice,
  teacherModalControl: teacherModalControlSlice,
  studentModalControl: studentModalControlSlice,
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
