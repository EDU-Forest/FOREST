import { createSlice } from "@reduxjs/toolkit";

interface teacherModalControlState {
  isOpenDropdown: boolean;
  isOpenAddClassModal: boolean;
  isOpenAddStudentModal: boolean;
  isOpenDeleteStudentModal: boolean;
}

const initialState: teacherModalControlState = {
  isOpenDropdown: false,
  isOpenAddClassModal: false,
  isOpenAddStudentModal: false,
  isOpenDeleteStudentModal: false,
};

const teacherModalControlSlice = createSlice({
  name: "teacherModalControl",
  initialState,
  reducers: {
    controlTeacherClassDropdown(state) {
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
  },
});

export const {
  controlTeacherClassDropdown,
  openAddClassModal,
  closeAddClassModal,
  openAddStudentModal,
  closeAddStudentModal,
  openDeleteStudentModal,
  closeDeleteStudentModal,
} = teacherModalControlSlice.actions;

export default teacherModalControlSlice.reducer;
