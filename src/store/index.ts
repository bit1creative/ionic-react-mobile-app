import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import localDataSlice from "./slices/recordSlice";
import psychologistsSlice from "./slices/psychologistsSlice";

export const store = configureStore({
  reducer: {
    psychologists: psychologistsSlice,
    localData: localDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
