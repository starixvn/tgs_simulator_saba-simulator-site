import { configureStore } from "@reduxjs/toolkit";
import singleBetReducer from "./slices/singleBetSlice";
import userInfoReducer from "./slices/userInfoSlice";
import sabaPlusReducer from "./slices/sabaPlusSlice";
import tabReducer from "./slices/tabSlice";
const store = configureStore({
  reducer: {
    singleBet: singleBetReducer,
    userInfo: userInfoReducer,
    tabSimulator: tabReducer,
    sabaPlus: sabaPlusReducer,
  },
});

export default store;
