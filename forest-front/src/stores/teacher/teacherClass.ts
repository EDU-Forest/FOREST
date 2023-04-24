import { createSlice } from "@reduxjs/toolkit";

interface teacherClassState {
  class: string;
}

const initialState: teacherClassState = {
  class: "싸피 고등학교 3반", // 나중에 query로 받아올 때, 첫 번째 클래스로 바꿔주기
};

const teacherClassSlice = createSlice({
  name: "teacherClass",
  initialState,
  reducers: {
    setClass(state, action) {
      state.class = action.payload;
    },
  },
});

export const { setClass } = teacherClassSlice.actions;

export default teacherClassSlice.reducer;
