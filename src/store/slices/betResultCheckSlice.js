import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betResultTicket: [],
  dataDisplay: {
    request: "",
    response: "",
  },
};

const sabaPlusSlice = createSlice({
  name: "sabaPlus",
  initialState,
  reducers: {
    addBetResultTicket: (state, action) => {
      const ticket = action.payload;
      const ticketExists = state.betResultTicket.includes(ticket);

      if (!ticketExists) {
        state.betResultTicket.push(ticket);
      }
    },
    updateDataDisplay: (state, action) => {
      state.dataDisplay = action.payload;
    },
  },
});

export const { addBetResultTicket, updateDataDisplay } = sabaPlusSlice.actions;
export default sabaPlusSlice.reducer;
