import { createSlice } from "@reduxjs/toolkit";

interface ObjType {
  [index: string]: number;
}

interface ClassState {
  nowClassName: string;
  nowClassId: number;
  nowStudyId: number;
  deleteStudentNum: number;
  studentPointList: ObjType;
  haveDescript: boolean;
}

const initialState: ClassState = {
  nowClassName: "",
  nowClassId: -1,
  nowStudyId: -1,
  deleteStudentNum: -1,
  studentPointList: {},
  haveDescript: false,
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
    setStudentPointList(state, action) {
      state.studentPointList = action.payload;
    },
    setHaveDescript(state, action) {
      state.haveDescript = action.payload;
    },
  },
});

export const { setClass, setStudy, setDeleteStudentNum, setStudentPointList, setHaveDescript } =
  classSlice.actions;

export default classSlice.reducer;
