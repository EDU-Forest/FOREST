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
    clearPaths(state) {
      state.paths = [];
    },
    controlCanvas(state) {
      state.isOpenCanvas = !state.isOpenCanvas;
    },
    closeCanvas(state) {
      state.isOpenCanvas = false;
      // state.paths = [];
    },
    setStudentStudyProblemId(state, action) {
      state.studentStudyProblemId = action.payload;
    },
  },
});

export const { setPaths, clearPaths, controlCanvas, closeCanvas, setStudentStudyProblemId } =
  canvasSlice.actions;

export default canvasSlice.reducer;
