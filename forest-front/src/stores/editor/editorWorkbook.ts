import { IWorkbookBySelf } from "@/types/Workbook";
import { createSlice } from "@reduxjs/toolkit";

interface EditorWorkbookState {
  curWorkbookIdx: number;
  workbooksBySelf: IWorkbookBySelf[];
}

const initialState: EditorWorkbookState = {
  curWorkbookIdx: 0,
  workbooksBySelf: [{ workbookId: -1, workbookTitle: "" }],
};

const editorWorkbookSlice = createSlice({
  name: "editorWorkbook",
  initialState,
  reducers: {
    setSelectWorkbook(state, action) {
      state.curWorkbookIdx = action.payload.curWorkbookIdx;
    },
    setWorkbookBySelf(state, action) {
      state.workbooksBySelf = action.payload.workbooksBySelf;
    },
  },
});

export const { setSelectWorkbook, setWorkbookBySelf } = editorWorkbookSlice.actions;

export default editorWorkbookSlice.reducer;
