import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SosSignalReport = {
  phone: string;
  streetName: string;
  condition: string;
  numberOfPerson: number;
  status: string;
  requestedDate: string;
  coordinates: { latitude: number; longitude: number } | undefined;
};

const initialState: SosSignalReport = {
  phone: "",
  streetName: "",
  condition: "",
  numberOfPerson: 0,
  status: "",
  requestedDate: "",
  coordinates: undefined,
};

const sosReport = createSlice({
  name: "sosReport",
  initialState,
  reducers: {
    setSosReport(_state, action: PayloadAction<SosSignalReport>) {
      return action.payload;
    },
    clearSosReport(_state) {
      return initialState;
    },
  },
});

export const { setSosReport, clearSosReport } = sosReport.actions;
export default sosReport.reducer;
