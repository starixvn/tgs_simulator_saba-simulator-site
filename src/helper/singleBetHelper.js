import { placeBetApi, confirmBetApi } from "../services/api";
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
  return data.CancelBet;
};

const getSettleBetData = () => {};

const getResettleBetData = () => {};

const getUnsettleBetData = () => {};

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
    callApi: null,
    label: "Cancel Bet",
  },
  settleBet: {
    getSampleData: getSettleBetData,
    callApi: null,
    label: "Settle Bet",
  },
  resettleBet: {
    getSampleData: getResettleBetData,
    callApi: null,
    label: "Resettle Bet",
  },
  unsettleBet: {
    getSampleData: getUnsettleBetData,
    callApi: null,
    label: "Unsettle Bet",
  },
};

export default singleBetLookup;
