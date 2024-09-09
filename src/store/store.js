import { configureStore } from "@reduxjs/toolkit";
import singleBetReducer from "./slices/singleBetSlice";
import userInfoReducer from "./slices/userInfoSlice";
const store = configureStore({
  reducer: {
    singleBet: singleBetReducer,
    userInfo: userInfoReducer,
  },
});

export default store;
