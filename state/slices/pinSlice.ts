import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

type Pin = {
  imageUrl: string;
  coords: [number, number];
  pinName: string;
  description: string;
  created_at?: string;
};

type PinState = {
  pins: Pin[];
};

const initialState: PinState = {
  pins: [],
};

const pinSlice = createSlice({
  name: "pin",
  initialState,
  reducers: {
    addPin(state, action: PayloadAction<[number, number]>) {
      state.pins.push({
        imageUrl: "",
        coords: action.payload,
        pinName: "",
        description: "",
      });
    },

    //note: change the nanoid() after
    setImage(
      state,
      action: PayloadAction<{ index: number; imageUrl: string }>,
    ) {
      const pin = state.pins[action.payload.index];
      if (!pin) return;
      pin.imageUrl = action.payload.imageUrl;
    },

    setPinName(state, action: PayloadAction<{ index: number; name: string }>) {
      const pin = state.pins[action.payload.index];
      if (!pin) return;
      pin.pinName = action.payload.name;
    },

    setDescription(
      state,
      action: PayloadAction<{ index: number; description: string }>,
    ) {
      const pin = state.pins[action.payload.index];
      if (!pin) return;
      pin.description = action.payload.description;
    },

    removePin(state, action: PayloadAction<number>) {
      state.pins = state.pins.filter((_, pin) => pin !== action.payload);
    },
    clearPins(state) {
      state.pins = [];
    },
  },
});

export const {
  addPin,
  setImage,
  setPinName,
  setDescription,
  removePin,
  clearPins,
} = pinSlice.actions;
export default pinSlice.reducer;
