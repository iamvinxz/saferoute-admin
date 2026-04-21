import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FloodReport = {
  streetName: string;
  depth: string;
  description: string;
};

type Segment = {
  points: [number, number][];
  coords: [number, number][];
  floodReport: FloodReport;
};

type SegmentState = {
  segments: Segment[];
};

const initialSegment: Segment = {
  points: [],
  coords: [],
  floodReport: { streetName: "", depth: "", description: "" },
};

const initialState: SegmentState = {
  segments: [],
};

const segmentSlice = createSlice({
  name: "segment",
  initialState,
  reducers: {
    addPoint(state, action: PayloadAction<[number, number]>) {
      const last = state.segments[state.segments.length - 1];
      if (!last) return;
      last.points.push(action.payload);
    },

    updateCoords(state, action: PayloadAction<[number, number][]>) {
      const last = state.segments[state.segments.length - 1];
      if (!last) return;
      last.coords = action.payload;
    },

    addSegment(state) {
      state.segments.push({
        points: [],
        coords: [],
        floodReport: {
          streetName: "",
          depth: "",
          description: "",
        },
      });
    },

    updateFloodReport(
      state,
      action: PayloadAction<{
        index: number;
        field: keyof FloodReport;
        value: string;
      }>,
    ) {
      const { index, field, value } = action.payload;
      state.segments[index].floodReport[field] = value;
    },

    removeSegment(state, action: PayloadAction<number>) {
      state.segments.splice(action.payload, 1);
    },

    clearSegment(state) {
      state.segments = [];
    },
  },
});

export const {
  addPoint,
  updateCoords,
  updateFloodReport,
  addSegment,
  removeSegment,
  clearSegment,
} = segmentSlice.actions;

export default segmentSlice.reducer;
