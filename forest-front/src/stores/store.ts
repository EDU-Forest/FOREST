import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import analysisSlice from "./analysis/analysis";
import classSlice from "./class/classInfo";
import classModalSlice from "./class/classModal";
import examSlice from "./exam/exam";
import userSlice from "./user/user";
import questionSlice from "./editor/editorQuestions";

const reducers = combineReducers({
  user: userSlice,
  class: classSlice,
  classModal: classModalSlice,
  analysis: analysisSlice,
  exam: examSlice,
  editQuestions: questionSlice,
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
