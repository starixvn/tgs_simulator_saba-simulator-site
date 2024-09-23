//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  clickedButtons: [],
  currentState: "",
  nextButtons: ["placeBet", "placeBetAndSettle", "placeFreeSpin"],
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
    placeFreeSpin: {
      request: null,
      response: null,
    },
  },
  betRetryData: {
    placeBet: [],
    endGame: [],
    placeBetAndSettle: [],
    placeFreeSpin: [],
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
          next: ["placeBet", "endGame"],
        },
        endGame: {
          clicked: ["endGame"],
          next: [],
        },
        placeBetAndSettle: {
          clicked: ["placeBetAndSettle"],
          next: [],
        },
        placeFreeSpin: {
          clicked: ["placeFreeSpin"],
          next: ["endGame"],
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
    updateStateRetry: (state, action) => {
      const { type, request, response, retryId } = action.payload;

      if (state.betData[type]) {
        state.betRetryData[type] = [
          ...state.betRetryData[type],
          { request: request, response: response, retryId: retryId },
        ];
      }
    },
    updateCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
    restartSabaPlusStore: (state) => {
      return initialState;
    },
  },
});

export const {
  handleChangeState,
  updateCurrentState,
  updateDisplayData,
  restartSabaPlusStore,
  updateStateRetry,
} = sabaPlusSlice.actions;
export default sabaPlusSlice.reducer;
