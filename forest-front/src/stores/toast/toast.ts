import { createSlice } from "@reduxjs/toolkit";

interface toastState {
  toastAnimation: string;
  toastState: boolean;
}

const initialState: toastState = {
  toastAnimation: "toast-alert",
  toastState: false,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToastAnimation(state, action) {
      state.toastAnimation = action.payload;
    },
    setToastState(state, action) {
      state.toastState = action.payload;
    },
  },
});

export const { setToastAnimation, setToastState } = toastSlice.actions;

export default toastSlice.reducer;
