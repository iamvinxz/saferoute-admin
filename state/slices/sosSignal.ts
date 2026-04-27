import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SOSsignal = {
  triggerSosSignal: boolean;
  triggerConfirmation: boolean;
};

const initialState: SOSsignal = {
  triggerSosSignal: false,
  triggerConfirmation: false,
};

const sosSignal = createSlice({
  name: "sos",
  initialState,
  reducers: {
    triggerSOSsignal(state) {
      state.triggerSosSignal = !state.triggerSosSignal;
    },
    triggerConfirmation(state) {
      state.triggerConfirmation = !state.triggerConfirmation;
    },
  },
});

export const { triggerSOSsignal, triggerConfirmation } = sosSignal.actions;
export default sosSignal.reducer;
