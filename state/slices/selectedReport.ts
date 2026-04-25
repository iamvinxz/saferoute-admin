import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Report = {
  index?: number;
  imageUrl?: string;
  streetName: string;
  depth: string;
  description: string;
  reportedAt?: string;
};

const initialState: Report = {
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
  },
});

export const { setReport } = selectedReport.actions;
export default selectedReport.reducer;
