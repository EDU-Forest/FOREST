import { createSlice } from "@reduxjs/toolkit";

interface teacherClassState {
  studyId: number | null;
  maxScore: number;
}

const initialState: teacherClassState = {
  studyId: null,
  maxScore: 0,
};

const analysisSlice = createSlice({
  name: "teacherClass",
  initialState,
  reducers: {
    setStudyId(state, action) {
      state.studyId = action.payload;
    },
    setMaxScore(state, action) {
      state.maxScore = action.payload;
    },
  },
});

export const { setStudyId, setMaxScore } = analysisSlice.actions;

export default analysisSlice.reducer;
