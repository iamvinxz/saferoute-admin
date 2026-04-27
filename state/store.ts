import { api } from "@/Redux/Services/APIService";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/state/slices/authSlice";
import segmentReducer from "@/state/slices/segment";
import pinReducer from "@/state/slices/pinSlice";
import modeReducer from "@/state/slices/modeSlice";
import reportReducer from "@/state/slices/selectedReport";
import sosReducer from "@/state/slices/sosSignal";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    segment: segmentReducer,
    pin: pinReducer,
    mode: modeReducer,
    report: reportReducer,
    sos: sosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
