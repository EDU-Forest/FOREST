import { WorkbookType } from "@/types/Workbook";
import { createSlice } from "@reduxjs/toolkit";

interface WorkbookDetailState {
  workbook: WorkbookType;
  isMoveToEditor: boolean;
  //   questionSummary: {
  //     id: number;
  //     title: string;
  //   }[];
}

const initialState: WorkbookDetailState = {
  workbook: {
    workbookId: 0,
    workbookImgPath: "",
    workbookImgId: 1,
    title: "",
    description: "",
    isPublic: false,
    isDeploy: false,
    bookmarkCount: 0,
    scrapCount: 0,
    volume: 0,
    isOriginal: false,
  },
  isMoveToEditor: false,
  //   questionSummary: [
  //     {
  //       title: "",
  //       id: 0,
  //     },
  //   ],
};

const workbookDetailSlice = createSlice({
  name: "workbookDetail",
  initialState,
  reducers: {
    setWorkbook(state, action) {
      state.workbook = action.payload;
    },
    // setQuestionSummary(state, action) {
    //   state.questionSummary = action.payload;
    // },
    setIsPublic(state) {
      state.workbook.isPublic = !state.workbook.isPublic;
    },
    setIsMoveToEditor(state, action) {
      state.isMoveToEditor = action.payload;
    },
    resetIsMoveToEditor(state) {
      state.isMoveToEditor = initialState.isMoveToEditor;
    },
    setInitWorkbookDetail(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setWorkbook,
  setIsPublic,
  setIsMoveToEditor,
  resetIsMoveToEditor,
  setInitWorkbookDetail,
} = workbookDetailSlice.actions;

export default workbookDetailSlice.reducer;
