import { createSlice } from "@reduxjs/toolkit";

const initialState: examState = {
  curProblemNum: 1,
  examTitle: "임시 시험 제목", // 임시로 넣음
  volume: 10,
  timeLimit: 0,
  problems: [
    {
      userAnswer: 4,
      problemNum: 1,
      type: "MULTIPLE",
      title: "나는야 문제 제목 2",
      text: "It is very unfortunate that I need to be drafting this letter. However, the worsening situation has forced me to submit a formal complaint. I have been renting from you for 0 years and you would agree that there is no doubt that I have paid rent every month either on time or even sometimes early. However, despite this, there has been no effort whatsoever on your part to deal with the noise disturbance of the neighboring unit I have brought to your attention multiple times. The noise which I have to deal with in the wee hours is terrible. I am afraid that I cannot stand the loud music happening at all hours in the next unit any more. Besides this, they leave a pile of garbage at my doorstep almost every other day. I hope you look into this matter at your earliest convenience.",
      items: [
        {
          itemId: 1234,
          no: 1,
          content: "나는 1번 보기",
          isImage: false,
        },
        {
          itemId: 1234,
          no: 1,
          content: "나는 2번 보기",
          isImage: false,
        },
        {
          itemId: 1234,
          no: 1,
          content: "나는 3번 보기",
          isImage: false,
        },
        {
          itemId: 1234,
          no: 1,
          content: "나는 4번 보기",
          isImage: false,
        },
      ],
    },

    {
      userAnswer: 2,
      problemNum: 2,
      type: "MULTIPLE",
      title: "나는야 문제 제목",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      items: [
        {
          itemId: 1234,
          no: 1,
          content: "Lorem Ipsum",
          isImage: false,
        },
        {
          itemId: 1234,
          no: 1,
          content: "Lorem Ipsum",
          isImage: false,
        },
        {
          itemId: 1234,
          no: 1,
          content: "Lorem Ipsum",
          isImage: false,
        },
        {
          itemId: 1234,
          no: 1,
          content: "Lorem Ipsum",
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
    setChooseAnswer(state, action) {
      state.problems[action.payload.problemNum - 1].userAnswer = action.payload.userAnswer;
    },
    setCurProblemNum(state, action) {
      state.curProblemNum = action.payload.curProblemNum;
    },
  },
});

export const { setChooseAnswer, setCurProblemNum } = examSlice.actions;

export default examSlice.reducer;
