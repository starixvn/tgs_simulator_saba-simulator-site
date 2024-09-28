import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betResultTicket: [],
  dataDisplay: {
    request: "",
    response: "",
  },
  ticketSelected: "",
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
    updateTicketSelected: (state, action) => {
      state.ticketSelected = action.payload;
    },
  },
});

export const { addBetResultTicket, updateDataDisplay, updateTicketSelected } =
  sabaPlusSlice.actions;
export default sabaPlusSlice.reducer;
