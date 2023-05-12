import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import classSlice from "./class/classInfo";
import classModalSlice from "./class/classModal";
import examSlice from "./exam/exam";
import canvasSlice from "./exam/canvas";
import userSlice from "./user/user";
import questionSlice from "./editor/editorQuestions";
import editorModalSlice from "./editor/editorModal";
import editorWorkbookSlice from "./editor/editorWorkbook";
import workbookDetailSlice from "./workbookDetail/workbookDetail";

const reducers = combineReducers({
  user: userSlice,
  class: classSlice,
  classModal: classModalSlice,
  exam: examSlice,
  canvas: canvasSlice,
  editorQuestions: questionSlice,
  editorModal: editorModalSlice,
  editorWorkbook: editorWorkbookSlice,
  workbookDetail: workbookDetailSlice,
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
