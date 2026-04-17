import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Pin = {
  coords: [number, number][];
  pinName: string;
};

type PinState = {
  pins: Pin[];
};

const initialPin: Pin = {
  coords: [],
  pinName: "",
};

const initialState: PinState = {
  pins: [initialPin],
};

const pinSlice = createSlice({
  name: "pin",
  initialState,
  reducers: {
    addCoordToLastPin(state, action: PayloadAction<[number, number]>) {
      if (state.pins.length === 0) return;
      const last = state.pins[state.pins.length - 1];
      last.coords.push(action.payload);
    },

    startNewPin(state) {
      state.pins.push({ coords: [], pinName: "" });
    },

    setPinName(state, action: PayloadAction<{ index: number; name: string }>) {
      const pin = state.pins[action.payload.index];
      if (!pin) return;
      pin.pinName = action.payload.name;
    },

    removePin(state, action: PayloadAction<number>) {
      state.pins.splice(action.payload, 1);
    },
  },
});

export const { addCoordToLastPin, startNewPin, setPinName, removePin } =
  pinSlice.actions;
export default pinSlice.reducer;
