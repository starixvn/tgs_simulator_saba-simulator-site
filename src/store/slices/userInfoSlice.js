import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  balance: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userId = action.payload.userId;
      state.balance = action.payload.balance;
    },
    restartUserInfoStore: () => {
      return initialState;
    },
  },
});

export const { setUserInfo, restartUserInfoStore } = userInfoSlice.actions;
export default userInfoSlice.reducer;
