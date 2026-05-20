import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  role: string;
  coordinates?: [number, number] | undefined;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  watchId: number | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  watchId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setCoordinates: (state, action: PayloadAction<[number, number]>) => {
      if (state.user) {
        state.user.coordinates = action.payload;
      }
    },
    setWatchId: (state, action: PayloadAction<number>) => {
      state.watchId = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setCoordinates, setWatchId, clearUser } =
  authSlice.actions;
export default authSlice.reducer;
