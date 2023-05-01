import { QuestionType } from "@/types/Workbook";
import { createSlice } from "@reduxjs/toolkit";

interface editorQuestions {
  questions: QuestionType[];
  curQuestion: number;
}

const initialState: editorQuestions = {
  questions: [
    {
      id: 0,
      problemNum: 0,
      type: "",
      title: "",
      text: "",
      point: 0,
      image: "",
      items: [
        {
          id: 0,
          no: 1,
          content: "",
          isImage: false,
        },
        {
          id: 0,
          no: 2,
          content: "",
          isImage: false,
        },
        {
          id: 0,
          no: 3,
          content: "",
          isImage: false,
        },
        {
          id: 0,
          no: 4,
          content: "",
          isImage: false,
        },
      ],
    },
  ],
  curQuestion: 1,
};

const questionSlice = createSlice({
  name: "editorQuestions",
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    setCurQuestion(state, action) {
      state.curQuestion = action.payload;
    },
  },
});

export const { setQuestions, setCurQuestion } = questionSlice.actions;

export default questionSlice.reducer;
