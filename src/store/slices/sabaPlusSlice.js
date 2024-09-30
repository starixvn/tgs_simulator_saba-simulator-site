//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { Provider, ProviderGameTypes } from "../../constant/Provider";
const initialState = {
  clickedButtons: [],
  currentState: "",
  nextButtons: ["placeBet", "placeBetAndSettle", "placeFreeSpin"],
  vendorOptions: {name: Provider.SIMULATOR, gameType: ProviderGameTypes[Provider.SIMULATOR][0]},
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
    voidGame: {
      request: null,
      response: null,
    },
    freeSpin: {
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
  scheduleData: {
    interval: null,
    loop: null,
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
          next: ["placeBet", "endGame", "voidGame", "freeSpin"],
        },
        endGame: {
          clicked: ["endGame"],
          next: ["voidGame", "freeSpin"],
        },
        placeBetAndSettle: {
          clicked: ["placeBetAndSettle"],
          next: ["voidGame", "freeSpin"],
        },
        placeFreeSpin: {
          clicked: ["placeFreeSpin"],
          next: ["endGame", "voidGame", "freeSpin"],
        },
        voidGame: {
          clicked: ["voidGame"],
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
    restartSabaPlusStore: (state, action) => {
      return {...initialState, ...action.payload};
    },
    updateScheduleData: (state, action) => {
      state.scheduleData = action.payload;
    },
    updateVendorOption: (state, action) => {
      state.vendorOptions = action.payload;
    },
  },
});

export const {
  handleChangeState,
  updateCurrentState,
  updateDisplayData,
  restartSabaPlusStore,
  updateStateRetry,
  updateScheduleData,
  updateVendorOption
} = sabaPlusSlice.actions;
export default sabaPlusSlice.reducer;
