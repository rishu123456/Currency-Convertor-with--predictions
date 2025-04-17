import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { exchangeRatesReducer } from "./exchnageRateSlice";

const persistConfig = {
  key: "root",
  storage,
};
exchangeRatesReducer

const rootReducer = combineReducers({
  exchangeRates: exchangeRatesReducer,  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
