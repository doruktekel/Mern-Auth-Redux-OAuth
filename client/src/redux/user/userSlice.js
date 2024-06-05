import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialUser: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.initialUser = action.payload;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInFailure, signInStart, signInSuccess } = userSlice.actions;

export default userSlice.reducer;
