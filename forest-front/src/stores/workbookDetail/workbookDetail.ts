import { WorkbookType } from "@/types/Workbook";
import { createSlice } from "@reduxjs/toolkit";

interface WorkbookDetailState {
  workbook: WorkbookType;
//   questionSummary: {
//     id: number;
//     title: string;
//   }[];
}

const initialState: WorkbookDetailState = {
  workbook: {
    workbookId: 0,
    workbookImgPath: "",
    title: "",
    description: "",
    isPublic: false,
    bookmarkCount: 0,
    scrapCount: 0,
    volume: 0,
    isOriginal: false,
  },
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
  },
});

export const { setWorkbook } = workbookDetailSlice.actions;

export default workbookDetailSlice.reducer;
