import { createSlice } from "@reduxjs/toolkit";

type modes = {
  isRouting: boolean;
  isPinMode: boolean;
};

const initialState: modes = {
  isRouting: false,
  isPinMode: false,
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    toggleIsRouting(state) {
      state.isRouting = !state.isRouting;
    },
    toggleIsPinMode(state) {
      state.isPinMode = !state.isPinMode;
    },
  },
});

export const { toggleIsPinMode, toggleIsRouting } = modeSlice.actions;
export default modeSlice.reducer;
