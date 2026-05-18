import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Report = {
  id: string;
  imageUrl?: string;
  streetName: string;
  depth: string;
  description: string;
  reportedAt: string;
  coordinates: [number, number] | undefined;
};

const initialState: Report = {
  id: "",
  imageUrl: "",
  streetName: "",
  depth: "",
  description: "",
  reportedAt: "",
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
