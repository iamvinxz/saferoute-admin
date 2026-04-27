import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Report = {
  index: number;
  imageUrl?: string;
  streetName: string;
  depth: string;
  description: string;
  reportedAt?: string;
  coordinates: [number, number] | undefined;
};

const initialState: Report = {
  index: -1,
  imageUrl: "",
  streetName: "",
  depth: "",
  description: "",
  coordinates: undefined,
};

const selectedReport = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReport(_state, action: PayloadAction<Report>) {
      return action.payload;
    },
    clearReport(_state) {
      return initialState;
    },
  },
});

export const { setReport, clearReport } = selectedReport.actions;
export default selectedReport.reducer;
