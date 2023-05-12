import { createSlice } from "@reduxjs/toolkit";

interface ObjType {
  [index: string]: number;
}

interface ClassState {
  analysisBack: boolean;
  nowClassName: string;
  nowClassId: number;
  nowStudyId: number;
  nowStudyType: string;
  deleteStudentNum: number;
  studentPointList: ObjType;
  haveDescript: boolean;
}

const initialState: ClassState = {
  analysisBack: true,
  nowClassName: "",
  nowClassId: -1,
  nowStudyId: -1,
  nowStudyType: "exam",
  deleteStudentNum: -1,
  studentPointList: {},
  haveDescript: false,
};

const classSlice = createSlice({
  name: "classInfo",
  initialState,
  reducers: {
    setAnalysisBack(state, action) {
      state.analysisBack = action.payload;
    },
    setClass(state, action) {
      state.nowClassName = action.payload.className;
      state.nowClassId = action.payload.classId;
      state.nowStudyType = "exam";
    },
    setStudy(state, action) {
      state.nowStudyId = action.payload;
    },
    setStudyType(state, action) {
      state.nowStudyType = action.payload;
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

export const {
  setAnalysisBack,
  setClass,
  setStudy,
  setStudyType,
  setDeleteStudentNum,
  setStudentPointList,
  setHaveDescript,
} = classSlice.actions;

export default classSlice.reducer;
