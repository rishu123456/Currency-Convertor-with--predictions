import { createSlice } from "@reduxjs/toolkit";

const exchangeRateSlice = createSlice({
  name: "exchangeRates",
  initialState: {
    data: null, 
    lastUpdated: null,
  },
  reducers: {
    setExchangeRates: (state, action) => {
      state.data = action.payload.data;
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const { setExchangeRates } = exchangeRateSlice.actions;

export const exchangeRatesReducer = exchangeRateSlice.reducer;
