import { QuestionType } from "@/types/Workbook";
import { createSlice } from "@reduxjs/toolkit";

interface editorQuestions {
  questions: QuestionType[];
  curQuestion: number;
  deleteAnswers: number[];
}

const initialState: editorQuestions = {
  questions: [
    {
      problemId: 0,
      problemNum: 0,
      type: "",
      title: "",
      text: "",
      answer: "",
      point: 0,
      problemImgPath: "",
      imgIsEmpty: false, 
      textIsEmpty: false, 
      itemList: [
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
  deleteAnswers: [],
};

const questionSlice = createSlice({
  name: "editorQuestions",
  initialState,
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload;
    },
    initCurQuestion(state) {
      state.curQuestion = initialState.curQuestion;
    },
    setCurQuestion(state, action) {
      state.curQuestion = action.payload;
    },
    setDeleteAnswers(state, action) {
      state.deleteAnswers = action.payload;
    },
  },
});

export const { setQuestions, initCurQuestion, setCurQuestion, setDeleteAnswers } =
  questionSlice.actions;

export default questionSlice.reducer;
