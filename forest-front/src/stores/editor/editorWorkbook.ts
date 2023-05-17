import { IWorkbookBySelf } from "@/types/Workbook";
import { createSlice } from "@reduxjs/toolkit";

interface EditorWorkbookState {
  curWorkbookId: number;
  curWorkbookTitle: string;
  workbooksBySelf: IWorkbookBySelf[];
}

const initialState: EditorWorkbookState = {
  curWorkbookId: -1,
  curWorkbookTitle: "",
  workbooksBySelf: [{ workbookId: -1, title: "" }],
};

const editorWorkbookSlice = createSlice({
  name: "editorWorkbook",
  initialState,
  reducers: {
    setSelectWorkbook(state, action) {
      state.curWorkbookId = action.payload.workbookId;
      state.curWorkbookTitle = action.payload.title;
    },
    resetSelectWorkbook(state) {
      state.curWorkbookId = initialState.curWorkbookId;
      state.curWorkbookTitle = initialState.curWorkbookTitle;
    },
    setWorkbookBySelf(state, action) {
      state.workbooksBySelf = action.payload;
    },
    addWorkbook(state, action) {
      state.workbooksBySelf.push(action.payload);
    },
    setInitEditorWorkbook(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setSelectWorkbook,
  resetSelectWorkbook,
  setWorkbookBySelf,
  addWorkbook,
  setInitEditorWorkbook,
} = editorWorkbookSlice.actions;

export default editorWorkbookSlice.reducer;
