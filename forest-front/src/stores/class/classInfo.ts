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
  studyTitle: string;
  isDescript: boolean;
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
  studyTitle: "",
  isDescript: false,
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
    setSelectedStudy(state, action) {
      state.isDescript = action.payload.isDescript;
      if (action.payload.title) {
        state.studyTitle = action.payload.title;
      }
    },
    // setInitClassInfo(state) {
    //   Object.assign(state, initialState);
    // },
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
  // setInitClassInfo,
  setSelectedStudy,
} = classSlice.actions;

export default classSlice.reducer;
