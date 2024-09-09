import { configureStore } from "@reduxjs/toolkit";
import singleBetReducer from "./slices/singleBetSlice";

const store = configureStore({
  reducer: {
    singleBet: singleBetReducer,
  },
});

export default store;
