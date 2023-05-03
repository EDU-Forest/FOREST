import { createSlice } from "@reduxjs/toolkit";

interface EditorModalState {
  isOpenModal: boolean;
  isOpenWholePdfModal: boolean;
  isOpenPartPdfModal: boolean;
}

const initialState: EditorModalState = {
  isOpenModal: false,
  isOpenWholePdfModal: false,
  isOpenPartPdfModal: false,
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
  },
});

export const {
  openPdfModal,
  closePdfModal,
  openWholePdfModal,
  closeWholePdfModal,
  openPartPdfModal,
  closePartPdfModal,
} = editorModalSlice.actions;

export default editorModalSlice.reducer;
