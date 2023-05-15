import { createSlice } from "@reduxjs/toolkit";

interface ObjType {
  [index: string]: number;
}

interface ClassState {
  analysisId: number;
  useAnalysisId: boolean;
  nowClassName: string;
  nowClassId: number;
  nowStudyId: number;
  nowStudyType: string;
  deleteStudentNum: number;
  studentPointList: ObjType;
}

const initialState: ClassState = {
  analysisId: -1,
  useAnalysisId: false,
  nowClassName: "",
  nowClassId: -1,
  nowStudyId: -1,
  nowStudyType: "exam",
  deleteStudentNum: -1,
  studentPointList: {},
};

const classSlice = createSlice({
  name: "classInfo",
  initialState,
  reducers: {
    setAnalysisId(state, action) {
      state.analysisId = action.payload;
    },
    setUseAnalysisId(state, action) {
      state.useAnalysisId = action.payload;
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
  },
});

export const {
  setAnalysisId,
  setUseAnalysisId,
  setClass,
  setStudy,
  setStudyType,
  setDeleteStudentNum,
  setStudentPointList,
} = classSlice.actions;

export default classSlice.reducer;
