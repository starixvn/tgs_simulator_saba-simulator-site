//@ts-nocheck
import {
  placeBetApi,
  confirmBetApi,
  canCelBetApi,
  settleBetApi,
  reSettleBetApi,
  unSettleBetApi,
} from "../services/api";
import data from "../constant/Data.json";
import store from "../store/store";
import { nanoid } from "nanoid";

const getPlaceBetData = () => {
  let betAmount = Math.round(Math.random() * 9 * 100) / 100;
  const betData = {
    ...data.PlaceBet,
    message: {
      ...data.PlaceBet.message,
      BetAmount: betAmount,
      DebitAmount: betAmount,
      ActualAmount: betAmount,
      OperationId: nanoid(20),
    },
  };
  return betData;
};

const getConfirmBetData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBet;
  const betAmount = placeBetData.request?.message?.BetAmount;
  const licenseeTxId = placeBetData?.response?.licenseeTxId;

  const betData = {
    ...data.ConfirmBet,
    message: {
      ...data.ConfirmBet.message,
      OperationId: nanoid(20),

      Txns: [
        {
          ...data.ConfirmBet.message.Txns[0],
          LicenseeTxId: licenseeTxId,
          ActualAmount: betAmount,
        },
        ...data.ConfirmBet.message.Txns.slice(1),
      ],
    },
  };

  return betData;
};

const getCancelBetData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBet;
  const betAmount = placeBetData.request?.message?.BetAmount;
  const betData = {
    ...data.CancelBet,
    message: {
      ...data.CancelBet.message,
      OperationId: nanoid(20),

      Txns: [
        {
          ...data.CancelBet.message.Txns[0],
          CreditAmount: betAmount,
        },
        ...data.ConfirmBet.message.Txns.slice(1),
      ],
    },
  };
  return betData;
};

const getSettleBetData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBet;
  const betAmount = placeBetData.request?.message?.BetAmount;
  const betData = {
    ...data.Settle,
    message: {
      ...data.Settle.message,
      OperationId: nanoid(20),
      Txns: [
        {
          ...data.Settle.message.Txns[0],
          CreditAmount: betAmount,
          Payout: betAmount,
        },
        ...data.Settle.message.Txns.slice(1),
      ],
    },
  };
  return betData;
};

const getResettleBetData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBet;
  const betAmount = placeBetData.request?.message?.BetAmount;
  const betData = {
    ...data.ReSettle,
    message: {
      ...data.ReSettle.message,
      OperationId: nanoid(20),
      Txns: [
        {
          ...data.ReSettle.message.Txns[0],
          Payout: betAmount,
        },
        ...data.ReSettle.message.Txns.slice(1),
      ],
    },
  };
  return betData;
};

const getUnsettleBetData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBet;
  const betAmount = placeBetData.request?.message?.BetAmount;
  const betData = {
    ...data.UnSettle,
    message: {
      ...data.ReSettle.message,
      OperationId: nanoid(20),
      Txns: [
        {
          ...data.UnSettle.message.Txns[0],
          DebitAmount: betAmount,
        },
        ...data.UnSettle.message.Txns.slice(1),
      ],
    },
  };
  return betData;
};

const singleBetLookup = {
  placeBet: {
    getSampleData: getPlaceBetData,
    callApi: placeBetApi,
    label: "Place Bet",
  },

  confirmBet: {
    getSampleData: getConfirmBetData,
    callApi: confirmBetApi,
    label: "Confirm Bet",
  },

  cancelBet: {
    getSampleData: getCancelBetData,
    callApi: canCelBetApi,
    label: "Cancel Bet",
  },
  settleBet: {
    getSampleData: getSettleBetData,
    callApi: settleBetApi,
    label: "Settle Bet",
  },
  resettleBet: {
    getSampleData: getResettleBetData,
    callApi: reSettleBetApi,
    label: "Resettle Bet",
  },
  unsettleBet: {
    getSampleData: getUnsettleBetData,
    callApi: unSettleBetApi,
    label: "Unsettle Bet",
  },
};

export default singleBetLookup;
