import { createSlice } from "@reduxjs/toolkit";

interface EditorModalState {
  isOpenModal: boolean;
  isOpenAddWorkbookModal: boolean;
  isOpenWholePdfModal: boolean;
  isOpenPartPdfModal: boolean;
  isFinished: boolean;
}

const initialState: EditorModalState = {
  isOpenModal: false,
  isOpenAddWorkbookModal: false,
  isOpenWholePdfModal: false,
  isOpenPartPdfModal: false,
  isFinished: false,
};

const editorModalSlice = createSlice({
  name: "editorModal",
  initialState,
  reducers: {
    openPdfModal(state) {
      state.isOpenModal = true;
    },
    closePdfModal(state) {
      state.isOpenModal = false;
    },
    openWholePdfModal(state) {
      state.isOpenWholePdfModal = true;
      state.isOpenPartPdfModal = false;
    },
    closeWholePdfModal(state) {
      state.isOpenWholePdfModal = false;
    },
    openPartPdfModal(state) {
      state.isOpenPartPdfModal = true;
      state.isOpenWholePdfModal = false;
    },
    closePartPdfModal(state) {
      state.isOpenPartPdfModal = false;
    },
    openAddWorkBookModal(state) {
      state.isOpenAddWorkbookModal = true;
      console.log(state.isOpenAddWorkbookModal);
    },

    closeAddWorkBookModal(state) {
      state.isOpenAddWorkbookModal = false;
    },
    controlEditorDropdown(state) {
      state.isOpenAddWorkbookModal = false;
    },
    setFinish(state, action) {
      state.isFinished = action.payload;
    },
  },
});

export const {
  openPdfModal,
  closePdfModal,
  openWholePdfModal,
  closeWholePdfModal,
  openPartPdfModal,
  closePartPdfModal,
  openAddWorkBookModal,
  closeAddWorkBookModal,
  controlEditorDropdown,
  setFinish,
} = editorModalSlice.actions;

export default editorModalSlice.reducer;
