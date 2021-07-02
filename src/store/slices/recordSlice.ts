// слайс для работы с записью на прием

import { createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "store";
import { getSavedInfoFromFirestore } from "services/firebase";

export const fetchSavedInfo = (): AppThunk => async (dispatch) => {
  const savedInfo = await getSavedInfoFromFirestore();
  dispatch(setFetchedInfo(savedInfo));
};

interface usersSelection {
  // indexes
  selectedPsychologistIndex: number;
  selectedDateIndex: number;
  selectedTimeIndex: number;
}

const initialState: usersSelection = {
  // ставим -1 для проверки в Home.tsx
  selectedPsychologistIndex: -1,
  selectedDateIndex: 0,
  selectedTimeIndex: 0,
};

export const localDataSlice = createSlice({
  name: "localData",
  initialState,
  reducers: {
    setSelectedPsychologistIndex: (state, { payload }) => {
      state.selectedPsychologistIndex = payload;
      // обнуляем выбранную инфу при смене психолога
      state.selectedDateIndex = 0;
      state.selectedTimeIndex = 0;
    },
    setSelectedDateIndex: (state, { payload }) => {
      state.selectedDateIndex = payload;
    },
    setSelectedTimeIndex: (state, { payload }) => {
      state.selectedTimeIndex = payload;
    },
    setFetchedInfo: (state, { payload }) => {
      state.selectedPsychologistIndex = payload.psychologistIndex;
      state.selectedDateIndex = payload.dateIndex;
      state.selectedTimeIndex = payload.timeIndex;
    },
  },
});

export const {
  setSelectedPsychologistIndex,
  setSelectedDateIndex,
  setSelectedTimeIndex,
  setFetchedInfo,
} = localDataSlice.actions;

// селекторы
export const selectedPsychologistIndexSelector = (state: RootState) =>
  state.localData.selectedPsychologistIndex;

export const selectedDateIndexSelector = (state: RootState) =>
  state.localData.selectedDateIndex;

export const selectedTimeIndexSelector = (state: RootState) =>
  state.localData.selectedTimeIndex;

export default localDataSlice.reducer;
