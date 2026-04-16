import { api } from "@/Redux/Services/APIService";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/state/slices/authSlice";
import segmentReducer from "@/state/slices/segment";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    segment: segmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
