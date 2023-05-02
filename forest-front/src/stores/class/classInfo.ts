import { createSlice } from "@reduxjs/toolkit";

interface ClassState {
  nowClassName: string;
  nowClassId: number;
  nowStudyId: number;
  deleteStudentNum: number;
  recentStudyId: number;
}

const initialState: ClassState = {
  nowClassName: "",
  nowClassId: -1,
  nowStudyId: -1,
  deleteStudentNum: -1,
  recentStudyId: -1,
};

const classSlice = createSlice({
  name: "classInfo",
  initialState,
  reducers: {
    setClass(state, action) {
      state.nowClassName = action.payload.className;
      state.nowClassId = action.payload.classId;
    },
    setStudy(state, action) {
      state.nowStudyId = action.payload;
    },
    setDeleteStudentNum(state, action) {
      state.deleteStudentNum = action.payload;
    },
    setRecentStudyId(state, action) {
      state.recentStudyId = action.payload;
    },
  },
});

export const { setClass, setStudy, setDeleteStudentNum, setRecentStudyId } = classSlice.actions;

export default classSlice.reducer;
