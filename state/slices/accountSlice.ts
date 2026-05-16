import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Account = {
  name: string;
  email: string;
  password: string;
  department: string;
  error: string;
};

const initialState: Account = {
  name: "",
  email: "",
  password: "",
  department: "",
  error: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setDepartment: (state, action: PayloadAction<string>) => {
      state.department = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearAccount: () => initialState,
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setDepartment,
  setError,
  clearAccount,
} = accountSlice.actions;
export default accountSlice.reducer;
