import { createSlice } from "@reduxjs/toolkit";

interface classModalState {
  isOpenDropdown: boolean;
  isOpenAddClassModal: boolean;
  isOpenAddStudentModal: boolean;
  isOpenDeleteStudentModal: boolean;
}

const initialState: classModalState = {
  isOpenDropdown: false,
  isOpenAddClassModal: false,
  isOpenAddStudentModal: false,
  isOpenDeleteStudentModal: false,
};

const classModalSlice = createSlice({
  name: "teacherModalControl",
  initialState,
  reducers: {
    controlClassDropdown(state) {
      state.isOpenDropdown = !state.isOpenDropdown;
      state.isOpenAddClassModal = false;
      state.isOpenAddStudentModal = false;
      state.isOpenDeleteStudentModal = false;
    },
    openAddClassModal(state) {
      state.isOpenAddClassModal = true;
      state.isOpenAddStudentModal = false;
      state.isOpenDeleteStudentModal = false;
    },
    closeAddClassModal(state) {
      state.isOpenAddClassModal = false;
    },
    openAddStudentModal(state) {
      state.isOpenAddStudentModal = true;
      state.isOpenDropdown = false;
      state.isOpenAddClassModal = false;
      state.isOpenDeleteStudentModal = false;
    },
    closeAddStudentModal(state) {
      state.isOpenAddStudentModal = false;
    },
    openDeleteStudentModal(state) {
      state.isOpenDeleteStudentModal = true;
      state.isOpenDropdown = false;
      state.isOpenAddClassModal = false;
      state.isOpenAddStudentModal = false;
    },
    closeDeleteStudentModal(state) {
      state.isOpenDeleteStudentModal = false;
    },
    closeAllModal(state) {
      state.isOpenDropdown = false;
      state.isOpenAddClassModal = false;
      state.isOpenAddStudentModal = false;
      state.isOpenDeleteStudentModal = false;
    },
    hideClassDropdown(state) {
      state.isOpenDropdown = false;
    },
  },
});

export const {
  controlClassDropdown,
  openAddClassModal,
  closeAddClassModal,
  openAddStudentModal,
  closeAddStudentModal,
  openDeleteStudentModal,
  closeDeleteStudentModal,
  closeAllModal,
  hideClassDropdown,
} = classModalSlice.actions;

export default classModalSlice.reducer;
