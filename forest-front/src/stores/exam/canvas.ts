import { createSlice } from "@reduxjs/toolkit";
import { CanvasPath } from "react-sketch-canvas";

interface canvasState {
  paths: CanvasPath[] | [];
  isOpenCanvas: boolean;
  studentStudyProblemId: number;
}

const initialState: canvasState = {
  paths: [],
  isOpenCanvas: false,
  studentStudyProblemId: -1,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setPaths(state, action) {
      state.paths = action.payload;
    },

    controlCanvas(state) {
      state.isOpenCanvas = !state.isOpenCanvas;
    },
    openCanvas(state) {
      state.isOpenCanvas = true;
    },
    closeCanvas(state) {
      state.isOpenCanvas = false;
    },
    setStudentStudyProblemId(state, action) {
      state.studentStudyProblemId = action.payload;
    },
    setInitCanvas(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setPaths,
  controlCanvas,
  openCanvas,
  closeCanvas,
  setStudentStudyProblemId,
  setInitCanvas,
} = canvasSlice.actions;

export default canvasSlice.reducer;
