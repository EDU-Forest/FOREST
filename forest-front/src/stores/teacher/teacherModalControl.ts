import { createSlice } from "@reduxjs/toolkit";

interface teacherModalControlState {
  isOpenDropdown: boolean;
  isOpenAddClassModal: boolean;
  isOpenAddStudentModal: boolean;
}

const initialState: teacherModalControlState = {
  isOpenDropdown: false,
  isOpenAddClassModal: false,
  isOpenAddStudentModal: false,
};

const teacherModalControlSlice = createSlice({
  name: "teacherModalControl",
  initialState,
  reducers: {
    controlTeacherClassDropdown(state) {
      state.isOpenDropdown = !state.isOpenDropdown;
      state.isOpenAddClassModal = false;
      state.isOpenAddStudentModal = false;
    },
    openAddClassModal(state) {
      state.isOpenAddClassModal = true;
      state.isOpenAddStudentModal = false;
    },
    closeAddClassModal(state) {
      state.isOpenAddClassModal = false;
    },
    openAddStudentModal(state) {
      state.isOpenAddStudentModal = true;
      state.isOpenDropdown = false;
      state.isOpenAddClassModal = false;
    },
    closeAddStudentModal(state) {
      state.isOpenAddStudentModal = false;
    },
  },
});

export const {
  controlTeacherClassDropdown,
  openAddClassModal,
  closeAddClassModal,
  openAddStudentModal,
  closeAddStudentModal,
} = teacherModalControlSlice.actions;

export default teacherModalControlSlice.reducer;
