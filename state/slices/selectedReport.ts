import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Report = {
  index: number;
  imageUrl?: string;
  streetName: string;
  depth: string;
  description: string;
  reportedAt?: string;
};

const initialState: Report = {
  index: -1,
  imageUrl: "",
  streetName: "",
  depth: "",
  description: "",
};

const selectedReport = createSlice({
  name: "report",
  initialState,
  reducers: {
    setReport(_state, action: PayloadAction<Report>) {
      return action.payload;
    },
    clearReport(state) {
      return initialState;
    },
  },
});

export const { setReport, clearReport } = selectedReport.actions;
export default selectedReport.reducer;
