import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

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
      const pin = state.pins.find((p) => p.id === action.payload.id);
      if (!pin) return;
      pin.imageUrl = action.payload.imageUrl;
    },

    setPinName(state, action: PayloadAction<{ id: string; name: string }>) {
      const pin = state.pins.find((p) => p.id === action.payload.id);
      if (!pin) return;
      pin.pinName = action.payload.name;
    },

    setDescription(
      state,
      action: PayloadAction<{ id: string; description: string }>,
    ) {
      const pin = state.pins.find((p) => p.id === action.payload.id);
      if (!pin) return;
      pin.description = action.payload.description;
    },

    removePin(state, action: PayloadAction<string>) {
      state.pins = state.pins.filter((pin) => pin.id !== action.payload);
    },
  },
});

export const { addPin, setImage, setPinName, setDescription, removePin } =
  pinSlice.actions;
export default pinSlice.reducer;
