import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SosSignalReport = {
  _id: string;
  phone: string | null;
  streetName: string;
  condition: string;
  numberOfPerson: number;
  status: string;
  requestedDate: string;
  coordinates: [number, number] | undefined;
  rescuerId: string | null;
};

const initialState: SosSignalReport = {
  _id: "",
  phone: "",
  streetName: "",
  condition: "",
  numberOfPerson: 0,
  status: "",
  requestedDate: "",
  coordinates: undefined,
  rescuerId: null,
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
