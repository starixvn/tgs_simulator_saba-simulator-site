//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  clickedButtons: [],
  nextButtons: ["placeBet"],
  currentState: "",
  betData: {
    placeBet: {
      request: null,
      response: null,
    },
    confirmBet: {
      request: null,
      response: null,
    },
    cancelBet: {
      request: null,
      response: null,
    },
    settleBet: {
      request: null,
      response: null,
    },
    resettleBet: {
      request: null,
      response: null,
    },
    unsettleBet: {
      request: null,
      response: null,
    },
  },
};

const singleBetSlice = createSlice({
  name: "singleBet",
  initialState,
  reducers: {
    handleChangeState: (state, action) => {
      const button = action.payload;
      const newClicked = [...state.clickedButtons];
      const newNext = [];

      switch (button) {
        case "placeBet":
          newClicked.push("placeBet");
          newNext.push("confirmBet", "cancelBet");
          break;
        case "confirmBet":
          newClicked.push("confirmBet");
          newNext.push("settleBet");
          break;
        case "cancelBet":
          newClicked.push("cancelBet");
          break;
        case "settleBet":
          newClicked.push("settleBet");
          newNext.push("resettleBet", "unsettleBet");
          break;
        case "resettleBet":
        case "unsettleBet":
          newClicked.push(button);
          break;
        default:
          break;
      }

      state.clickedButtons = newClicked;
      state.nextButtons = newNext;
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

export const { handleChangeState, updateDisplayData, updateCurrentState } =
  singleBetSlice.actions;
export default singleBetSlice.reducer;
