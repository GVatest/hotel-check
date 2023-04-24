import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createRoutine } from "redux-saga-routines";
import { IUser } from "../models";
import { Credentials } from "../types";

const slicePrefix = "auth";

type authState = {
  user: IUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error?: string;
};

const initialState: authState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
};

const payloadCreatorLogin = {
  trigger: (payload: Credentials) => payload,
  success: (payload: IUser) => payload,
  request: () => ({}),
  fulfill: () => ({}),
};

const payloadCreatorLogout = {
  trigger: () => ({}),
  success: () => ({}),
  request: () => ({}),
  fulfill: () => ({}),
};

export const login = createRoutine(`${slicePrefix}/login`, payloadCreatorLogin);
export const logout = createRoutine(
  `${slicePrefix}/logout`,
  payloadCreatorLogout
);

const authSlice = createSlice({
  name: slicePrefix,
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IUser>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(login.SUCCESS, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(login.FULFILL, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.REQUEST, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.SUCCESS, (state) => {
        state.user = null;
        state.isLoggedIn = false;
        state.isLoading = false;
      })
      .addCase(logout.FULFILL, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
