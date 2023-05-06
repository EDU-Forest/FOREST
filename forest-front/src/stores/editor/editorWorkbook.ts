import { IWorkbookBySelf } from "@/types/Workbook";
import { createSlice } from "@reduxjs/toolkit";

interface EditorWorkbookState {
  curWorkbookId: number;
  curWorkbookTitle: string;
  workbooksBySelf: IWorkbookBySelf[];
}

const initialState: EditorWorkbookState = {
  curWorkbookId: 0,
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
