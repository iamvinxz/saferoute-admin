import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

type Pin = {
  id: string;
  imageUrl: string;
  coords: [number, number];
  pinName: string;
  description: string;
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
        id: nanoid(),
        imageUrl: "",
        coords: action.payload,
        pinName: "",
        description: "",
      });
    },

    //note: change the nanoid() after
    setImage(state, action: PayloadAction<{ id: string; imageUrl: string }>) {
      const pin = state.pins[state.pins.length - 1];
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
      state.pins.splice(action.payload, 1);
    },
  },
});

export const { addPin, setPinName, setDescription, removePin } =
  pinSlice.actions;
export default pinSlice.reducer;
