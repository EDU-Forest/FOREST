import { examState } from "@/types/Exam";
import { createSlice } from "@reduxjs/toolkit";

const initialState: examState = {
  studyId: -1,
  isSubmitted: false,
  isGraded: false,
  isEnded: false, // 시간
  isStarted: false,
  curProblemNum: 1,
  volume: 1,
  startTime: new Date(),
  endTime: new Date(),
  userName: "",
  studyName: "",
  problem: [
    {
      studentStudyProblemId: 1,
      problemNum: 1,
      type: "",
      title: "",
      text: "",
      point: 0,
      problemImgPath: "",
      userAnswer: "",
      problemAnswer: "",
      item: [
        {
          itemId: 1,
          no: 1,
          content: "",
          isImage: false,
        },
        {
          itemId: 2,
          no: 2,
          content: "",
          isImage: false,
        },
        {
          itemId: 3,
          no: 3,
          content: "",
          isImage: false,
        },
        {
          itemId: 4,
          no: 4,
          content: "",
          isImage: false,
        },
      ],
    },
  ],
  toggleModal: false,
  page: "",
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setStudyProblems(state, action) {
      // state = {
      //   ...state,
      //   ...action.payload,
      // };
      state.volume = action.payload.volume;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
      state.problem = action.payload.problem;
    },
    setChooseAnswer(state, action) {
      state.problem[action.payload.problemNum - 1].userAnswer = action.payload.userAnswer;
    },
    setCurProblemNum(state, action) {
      state.curProblemNum = action.payload.curProblemNum;
    },
    setinitProblem(state) {
      state.curProblemNum = 1;
      state.isStarted = false;
    },
    setStudyStart(state) {
      state.isStarted = true;
      state.isEnded = false;
    },
    setStudyInfo(state, action) {
      state.volume = action.payload.volume;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
      state.userName = action.payload.userName;
      state.studyName = action.payload.studyName;
      state.isSubmitted = action.payload.isSubmitted;
    },
    setEndStudy(state) {
      state.isEnded = true;
      state.isStarted = false;
    },
    setToggleModal(state, action) {
      state.toggleModal = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTestStudyId(state, action) {
      state.studyId = action.payload;
    },
    setResult(state, action) {
      state.isSubmitted = action.payload.isSubmitted;
      state.isGraded = action.payload.isGraded;
    },
    setInitExam(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setChooseAnswer,
  setCurProblemNum,
  setStudyProblems,
  setinitProblem,
  setStudyInfo,
  setStudyStart,
  setEndStudy,
  setToggleModal,
  setPage,
  setTestStudyId,
  setResult,
  setInitExam,
} = examSlice.actions;

export default examSlice.reducer;
