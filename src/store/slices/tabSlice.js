import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabValue: "manual",
};

const userInfoSlice = createSlice({
  name: "tab simulator",
  initialState,
  reducers: {
    updateTabValue: (state, action) => {
      state.tabValue = action.payload;
    },
  },
});

export const { updateTabValue } = userInfoSlice.actions;
export default userInfoSlice.reducer;
