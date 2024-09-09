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
  },
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
