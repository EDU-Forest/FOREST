import { createSlice } from "@reduxjs/toolkit";

interface teacherClassState {
  studyId: number | null;
}

const initialState: teacherClassState = {
  studyId: null,
};

const analysisSlice = createSlice({
  name: "teacherClass",
  initialState,
  reducers: {
    setStudyId(state, action) {
      state.studyId = action.payload;
    },
  },
});

export const { setStudyId } = analysisSlice.actions;

export default analysisSlice.reducer;
