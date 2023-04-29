import { createSlice } from "@reduxjs/toolkit";

interface studentModalControlState {
  isOpenDropdown: boolean;
}

const initialState: studentModalControlState = {
  isOpenDropdown: false,
};

const studentModalControlSlice = createSlice({
  name: "studentModalControl",
  initialState,
  reducers: {
    controlStudentClassDropdown(state) {
      state.isOpenDropdown = !state.isOpenDropdown;
    },
  },
});

export const { controlStudentClassDropdown } = studentModalControlSlice.actions;

export default studentModalControlSlice.reducer;
