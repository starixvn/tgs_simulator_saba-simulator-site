//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  clickedButtons: [],
  currentState: "",
  nextButtons: ["placeBet", "placeBetAndSettle", "endGame"],
  betData: {
    placeBet: {
      request: null,
      response: null,
    },
    endGame: {
      request: null,
      response: null,
    },
    placeBetAndSettle: {
      request: null,
      response: null,
    },
  },
};

const sabaPlusSlice = createSlice({
  name: "sabaPlus",
  initialState,
  reducers: {
    handleChangeState: (state, action) => {
      const key = action.payload;
      const buttonActions = {
        placeBet: {
          clicked: ["placeBet"],
          next: ["endGame"],
        },
        endGame: {
          clicked: ["endGame"],
          next: [],
        },
      };

      const actions = buttonActions[key] || { clicked: [], next: [] };

      state.clickedButtons = [...state.clickedButtons, ...actions.clicked];
      state.nextButtons = actions.next;
    },
    updateDisplayData: (state, action) => {
      const { type, request, response } = action.payload;
      if (state.betData[type]) {
        state.betData[type].request = request;
        state.betData[type].response = response;
      }
    },
    updateCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
  },
});

export const { handleChangeState, updateCurrentState, updateDisplayData } =
  sabaPlusSlice.actions;
export default sabaPlusSlice.reducer;
