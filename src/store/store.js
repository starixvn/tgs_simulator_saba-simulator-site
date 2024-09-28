import { configureStore } from "@reduxjs/toolkit";
import singleBetReducer from "./slices/singleBetSlice";
import userInfoReducer from "./slices/userInfoSlice";
import sabaPlusReducer from "./slices/sabaPlusSlice";
import tabReducer from "./slices/tabSlice";
import betResultReducer from "./slices/betResultCheckSlice";
const store = configureStore({
  reducer: {
    singleBet: singleBetReducer,
    userInfo: userInfoReducer,
    tabSimulator: tabReducer,
    sabaPlus: sabaPlusReducer,
    betResultCheck: betResultReducer,
  },
});

export default store;
