import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FloodReport = {
  imageUrl: string;
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
  floodReport: { imageUrl: "", streetName: "", depth: "", description: "" },
};

const initialState: SegmentState = {
  segments: [initialSegment],
};

const segmentSlice = createSlice({
  name: "segment",
  initialState,
  reducers: {
    addPoint(state, action: PayloadAction<[number, number]>) {
      const last = state.segments[state.segments.length - 1];
      last.points.push(action.payload);
    },

    updateCoords(state, action: PayloadAction<[number, number][]>) {
      const last = state.segments[state.segments.length - 1];
      last.coords = action.payload;
    },

    addSegment(state) {
      state.segments.push({
        ...initialSegment,
        points: [],
        coords: [],
        floodReport: {
          imageUrl: "",
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
  },
});

export const { addPoint, updateCoords, updateFloodReport, addSegment } =
  segmentSlice.actions;

export default segmentSlice.reducer;
