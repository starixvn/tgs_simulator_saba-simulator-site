import { configureStore } from "@reduxjs/toolkit";
import singleBetReducer from "./slices/singleBetSlice";
import userInfoReducer from "./slices/userInfoSlice";
import tabReducer from "./slices/tabSlice";
const store = configureStore({
  reducer: {
    singleBet: singleBetReducer,
    userInfo: userInfoReducer,
    tabSimulator: tabReducer,
  },
});

export default store;
