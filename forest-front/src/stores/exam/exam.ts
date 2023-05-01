import { createSlice } from "@reduxjs/toolkit";

const initialState: examState = {
  examTitle: "임시 시험 제목", // 임시로 넣음
  volume: 10,
  timeLimit: 0,
  problems: [
    {
      userAnswer: 2,
      problemNum: 1,
      type: "MULTIPLE",
      title: "나는야 문제 제목",
      text: "It is very unfortunate that I need to be drafting this letter. However, the worsening situation has forced me to submit a formal complaint. I have been renting from you for 0 years and you would agree that there is no doubt that I have paid rent every month either on time or even sometimes early. However, despite this, there has been no effort whatsoever on your part to deal with the noise disturbance of the neighboring unit I have brought to your attention multiple times. The noise which I have to deal with in the wee hours is terrible. I am afraid that I cannot stand the loud music happening at all hours in the next unit any more. Besides this, they leave a pile of garbage at my doorstep almost every other day. I hope you look into this matter at your earliest convenience.",
      item: [
        {
          itemId: 1234,
          no: 1,
          content: "나는 1번 보기",
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
  },
});

export const { setChooseAnswer } = examSlice.actions;

export default examSlice.reducer;
