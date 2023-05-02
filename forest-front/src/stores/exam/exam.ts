import { createSlice } from "@reduxjs/toolkit";

const initialState: examState = {
  // curProblemNum: 1,
  // examTitle: "임시 시험 제목", // 임시로 넣음
  // volume: 10,
  // startTime: new Date("2023-01-01"),
  // endTime: new Date(),
  // problem: [
  //   {
  //     studentStudyProblemId: 1,
  //     problemNum: 1,
  //     type: "MULTIPLE",
  //     title: "나는야 객관식",
  //     text: "It is very unfortunate that I need to be drafting this letter. However, the worsening situation has forced me to submit a formal complaint. I have been renting from you for 0 years and you would agree that there is no doubt that I have paid rent every month either on time or even sometimes early. However, despite this, there has been no effort whatsoever on your part to deal with the noise disturbance of the neighboring unit I have brought to your attention multiple times. The noise which I have to deal with in the wee hours is terrible. I am afraid that I cannot stand the loud music happening at all hours in the next unit any more. Besides this, they leave a pile of garbage at my doorstep almost every other day. I hope you look into this matter at your earliest convenience.",
  //     problemImgPath: "",
  //     userAnswer: "",
  //     problemAnswer: "",
  //     item: [
  //       {
  //         itemId: 1,
  //         no: 1,
  //         content: "나는 1번 보기",
  //         isImage: false,
  //       },
  //       {
  //         itemId: 2,
  //         no: 2,
  //         content: "나는 2번 보기",
  //         isImage: false,
  //       },
  //       {
  //         itemId: 3,
  //         no: 3,
  //         content: "나는 3번 보기",
  //         isImage: false,
  //       },
  //       {
  //         itemId: 4,
  //         no: 4,
  //         content: "나는 4번 보기",
  //         isImage: false,
  //       },
  //     ],
  //   },
  // ],
  curProblemNum: 1,
  examTitle: "임시 시험 제목", // 임시로 넣음
  volume: 10,
  startTime: new Date("2023-01-01"),
  endTime: new Date(),
  problem: [
    {
      studentStudyProblemId: 1,
      problemNum: 1,
      type: "MULTIPLE",
      title: "나는야 객관식",
      text: "It is very unfortunate that I need to be drafting this letter. However, the worsening situation has forced me to submit a formal complaint. I have been renting from you for 0 years and you would agree that there is no doubt that I have paid rent every month either on time or even sometimes early. However, despite this, there has been no effort whatsoever on your part to deal with the noise disturbance of the neighboring unit I have brought to your attention multiple times. The noise which I have to deal with in the wee hours is terrible. I am afraid that I cannot stand the loud music happening at all hours in the next unit any more. Besides this, they leave a pile of garbage at my doorstep almost every other day. I hope you look into this matter at your earliest convenience.",
      problemImgPath: "",
      userAnswer: "",
      problemAnswer: "",
      item: [
        {
          itemId: 1,
          no: 1,
          content: "나는 1번 보기",
          isImage: false,
        },
        {
          itemId: 2,
          no: 2,
          content: "나는 2번 보기",
          isImage: false,
        },
        {
          itemId: 3,
          no: 3,
          content: "나는 3번 보기",
          isImage: false,
        },
        {
          itemId: 4,
          no: 4,
          content: "나는 4번 보기",
          isImage: false,
        },
      ],
    },
    {
      studentStudyProblemId: 2,
      problemNum: 2,
      type: "SUBJECTIVE",
      title: "나는야 주관식",
      text: "It is very unfortunate that I need to be drafting this letter. However, the worsening situation has forced me to submit a formal complaint. I have been renting from you for 0 years and you would agree that there is no doubt that I have paid rent every month either on time or even sometimes early. However, despite this, there has been no effort whatsoever on your part to deal with the noise disturbance of the neighboring unit I have brought to your attention multiple times. The noise which I have to deal with in the wee hours is terrible. I am afraid that I cannot stand the loud music happening at all hours in the next unit any more. Besides this, they leave a pile of garbage at my doorstep almost every other day. I hope you look into this matter at your earliest convenience.",
      problemImgPath: "",
      userAnswer: "",
      problemAnswer: "",
    },
    {
      studentStudyProblemId: 3,
      problemNum: 3,
      type: "DESCRIPT",
      title: "나는야 서술형",
      text: "It is very unfortunate that I need to be drafting this letter. However, the worsening situation has forced me to submit a formal complaint. I have been renting from you for 0 years and you would agree that there is no doubt that I have paid rent every month either on time or even sometimes early. However, despite this, there has been no effort whatsoever on your part to deal with the noise disturbance of the neighboring unit I have brought to your attention multiple times. The noise which I have to deal with in the wee hours is terrible. I am afraid that I cannot stand the loud music happening at all hours in the next unit any more. Besides this, they leave a pile of garbage at my doorstep almost every other day. I hope you look into this matter at your earliest convenience.",
      problemImgPath: "",
      userAnswer: "",
      problemAnswer: "",
    },
    {
      studentStudyProblemId: 4,
      problemNum: 4,
      type: "OX",
      title: "나는야 OX",
      text: "It is very unfortunate that I need to be drafting this letter. However, the worsening situation has forced me to submit a formal complaint. I have been renting from you for 0 years and you would agree that there is no doubt that I have paid rent every month either on time or even sometimes early. However, despite this, there has been no effort whatsoever on your part to deal with the noise disturbance of the neighboring unit I have brought to your attention multiple times. The noise which I have to deal with in the wee hours is terrible. I am afraid that I cannot stand the loud music happening at all hours in the next unit any more. Besides this, they leave a pile of garbage at my doorstep almost every other day. I hope you look into this matter at your earliest convenience.",
      problemImgPath: "",
      userAnswer: "",
      problemAnswer: "",
    },
  ],
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setStudyProblems(state, action) {
      state = {
        ...state,
        ...action.payload,
      };
    },
    setChooseAnswer(state, action) {
      state.problem[action.payload.problemNum - 1].userAnswer = action.payload.userAnswer;
    },
    setCurProblemNum(state, action) {
      state.curProblemNum = action.payload.curProblemNum;
    },
  },
});

export const { setChooseAnswer, setCurProblemNum, setStudyProblems } = examSlice.actions;

export default examSlice.reducer;
