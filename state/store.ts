import { api } from "@/Redux/Services/APIService";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/state/slices/authSlice";
import segmentReducer from "@/state/slices/segment";
import pinReducer from "@/state/slices/pinSlice";
import modeReducer from "@/state/slices/modeSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    segment: segmentReducer,
    pin: pinReducer,
    mode: modeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
