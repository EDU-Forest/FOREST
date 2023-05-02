import { createSlice } from "@reduxjs/toolkit";

interface ClassState {
  nowClassName: string;
  nowClassId: number;
  nowStudyId: number;
  deleteStudentNum: number;
}

const initialState: ClassState = {
  nowClassName: "싸피 고등학교 3반", // 나중에 query로 받아올 때, 첫 번째 클래스로 바꿔주기
  nowClassId: 1,
  nowStudyId: 1,
  deleteStudentNum: 0,
};

const classSlice = createSlice({
  name: "classInfo",
  initialState,
  reducers: {
    setClass(state, action) {
      state.nowClassName = action.payload.name;
      state.nowClassId = action.payload.classId;
    },
    setStudy(state, action) {
      state.nowStudyId = action.payload;
    },
    setDeleteStudentNum(state, action) {
      state.deleteStudentNum = action.payload;
    },
  },
});

export const { setClass, setStudy, setDeleteStudentNum } = classSlice.actions;

export default classSlice.reducer;
