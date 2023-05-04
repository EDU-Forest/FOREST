import { createSlice } from "@reduxjs/toolkit";

const initialState: examState = {
  isStarted: false,
  curProblemNum: 1,
  examTitle: "",
  volume: 1,
  startTime: 0,
  endTime: 0,
  presenter: "",
  problem: [
    {
      studentStudyProblemId: 1,
      problemNum: 1,
      type: "",
      title: "",
      text: "",
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
      state.problem = action.payload.problem;
      console.log(state);
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
    },
    setStudyInfo(state, action) {
      state.volume = action.payload.volume;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
      state.presenter = action.payload.name;
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
} = examSlice.actions;

export default examSlice.reducer;
