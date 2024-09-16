//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  clickedButtons: [],
  nextButtons: ["placeBet", "placeBetParlay"],
  currentState: {
    type: "",
    retryId: null,
  },
  scheduleData: {
    interval: null,
    loop: null,
  },
  betData: {
    placeBetParlay: {
      request: null,
      response: null,
    },
    confirmBetParlay: {
      request: null,
      response: null,
    },
    settleBetParlay: {
      request: null,
      response: null,
    },
    cancelBetParlay: {
      request: null,
      response: null,
    },
    resettleBetParlay: {
      request: null,
      response: null,
    },
    unsettleBetParlay: {
      request: null,
      response: null,
    },
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
  betRetryData: {
    placeBetParlay: [],
    confirmBetParlay: [],
    settleBetParlay: [],
    cancelBetParlay: [],
    resettleBetParlay: [],
    unsettleBetParlay: [],
    placeBet: [],
    confirmBet: [],
    cancelBet: [],
    settleBet: [],
    resettleBet: [],
    unsettleBet: [],
  },
};

const singleBetSlice = createSlice({
  name: "singleBet",
  initialState,
  reducers: {
    handleChangeState: (state, action) => {
      const button = action.payload;

      const buttonActions = {
        placeBetParlay: {
          clicked: ["placeBetParlay"],
          next: ["cancelBetParlay", "confirmBetParlay"],
        },
        confirmBetParlay: {
          clicked: ["confirmBetParlay"],
          next: ["settleBetParlay"],
        },
        settleBetParlay: {
          clicked: ["settleBetParlay"],
          next: ["resettleBetParlay", "unsettleBetParlay"],
        },
        resettleBetParlay: {
          clicked: ["resettleBetParlay"],
          next: [],
        },
        unsettleBetParlay: {
          clicked: ["unsettleBetParlay"],
          next: [],
        },
        cancelBetParlay: {
          clicked: ["cancelBetParlay"],
          next: ["cancelBetParlay"],
        },
        placeBet: {
          clicked: ["placeBet"],
          next: ["confirmBet", "cancelBet"],
        },
        confirmBet: {
          clicked: ["confirmBet"],
          next: ["settleBet"],
        },
        cancelBet: {
          clicked: ["cancelBet"],
          next: ["cancelBet"],
        },
        settleBet: {
          clicked: ["settleBet"],
          next: ["resettleBet", "unsettleBet"],
        },
        resettleBet: {
          clicked: ["resettleBet"],
          next: [],
        },
        unsettleBet: {
          clicked: ["unsettleBet"],
          next: [],
        },
      };

      const actions = buttonActions[button] || { clicked: [], next: [] };

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
    restartSingleBetStore: () => {
      return initialState;
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
    updateScheduleData: (state, action) => {
      state.scheduleData = action.payload;
    },
  },
});

export const {
  handleChangeState,
  updateDisplayData,
  updateCurrentState,
  restartSingleBetStore,
  updateStateRetry,
  updateScheduleData,
} = singleBetSlice.actions;
export default singleBetSlice.reducer;
