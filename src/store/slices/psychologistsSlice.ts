// Слайс для работы с Файрстором

import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "store";
import { getPsychologistsFromFirestore } from "services/firebase";

// фетч инфы
export const fetchPsychologists = (): AppThunk => async (dispatch) => {
  const psychologists = await getPsychologistsFromFirestore();
  dispatch(setPsychologists(psychologists));
};

// интерфейс психолога
export interface Psychologist {
  _id: string;
  name: string;
  profilePicUrl: string;
  consultationDuration: string;
  dates: ConsultationDate[];
}

// интерфейс возможных дат
export interface ConsultationDate {
  date: string;
  // ["11:30", ...]
  time: string[];
}

interface state {
  psychologists: Psychologist[];
}

const initialState: state = {
  psychologists: [],
};

export const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState,
  reducers: {
    setPsychologists: (state, { payload }: any) => {
      state.psychologists = payload;
    },
  },
});

export const { setPsychologists } = psychologistsSlice.actions;
export const psychologistsSelector = (state: RootState) =>
  state.psychologists.psychologists;

export default psychologistsSlice.reducer;
