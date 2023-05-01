import { createSlice } from "@reduxjs/toolkit";

interface userState {
  role: "TEACHER" | "STUDENT";
  username: string;
}

const initialState: userState = {
  role: "TEACHER", // 임시로 넣음
  username: "킹규림",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
  },
});

export const { setRole, setUsername } = userSlice.actions;

export default userSlice.reducer;
