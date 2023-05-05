import { IWorkbookBySelf } from "@/types/Workbook";
import { createSlice } from "@reduxjs/toolkit";

interface EditorWorkbookState {
  curWorkbookIdx: number;
  workbooksBySelf: IWorkbookBySelf[];
}

const initialState: EditorWorkbookState = {
  curWorkbookIdx: 0,
  workbooksBySelf: [{ workbookId: -1, title: "" }],
};

const editorWorkbookSlice = createSlice({
  name: "editorWorkbook",
  initialState,
  reducers: {
    setSelectWorkbook(state, action) {
      state.curWorkbookIdx = action.payload;
    },
    setWorkbookBySelf(state, action) {
      state.workbooksBySelf = action.payload;
    },
    addWorkbook(state, action) {
      state.workbooksBySelf.push(action.payload);
    },
  },
});

export const { setSelectWorkbook, setWorkbookBySelf, addWorkbook } = editorWorkbookSlice.actions;

export default editorWorkbookSlice.reducer;
