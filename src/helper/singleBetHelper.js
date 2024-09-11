//@ts-nocheck
import {
  placeBetApi,
  placeBetParlayApi,
  confirmBetParlayApi,
  confirmBetApi,
  canCelBetApi,
  settleBetApi,
  reSettleBetApi,
  unSettleBetApi,
} from "../services/api";
import data from "../constant/Data.json";
import store from "../store/store";
import { formatCurrentDate, formatCurrentDateTime } from "./datetimeHelper";
import { nanoid } from "nanoid";

const getPlaceBetData = () => {
  let betAmount = Math.round(Math.random() * 9 * 100) / 100;
  const simulatedTime = formatCurrentDateTime();
  const userId = store.getState().userInfo.userId;
  const betData = {
    ...data.PlaceBet,
    message: {
      ...data.PlaceBet.message,
      BetAmount: betAmount,
      DebitAmount: betAmount,
      ActualAmount: betAmount,
      KickOffTime: simulatedTime,
      BetTime: simulatedTime,
      UpdateTime: simulatedTime,
      MatchDateTime: simulatedTime,
      RefId: `simulator_${nanoid(15)}`,
      OperationId: nanoid(20),
      UserId: userId,
    },
  };
  return betData;
};

const getConfirmBetData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBet;
  const userId = store.getState().userInfo.userId;
  const { BetAmount, RefId } = placeBetData.request?.message;
  const licenseeTxId = placeBetData?.response?.licenseeTxId;
  const simulatedTime = formatCurrentDateTime();
  const simulatedDate = formatCurrentDate();

  const betData = {
    ...data.ConfirmBet,
    message: {
      ...data.ConfirmBet.message,
      OperationId: nanoid(20),
      UpdateTime: simulatedTime,
      TransactionTime: simulatedTime,
      UserId: userId,
      Txns: [
        {
          ...data.ConfirmBet.message.Txns[0],
          LicenseeTxId: licenseeTxId,
          RefId: RefId,
          TxId: generateRandomNumber(18),
          WinlostDate: simulatedDate,
          ActualAmount: BetAmount,
        },
        ...data.ConfirmBet.message.Txns.slice(1),
      ],
    },
  };

  return betData;
};

const getCancelBetData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBet;
  const userId = store.getState().userInfo.userId;
  const { BetAmount, RefId } = placeBetData.request?.message;
  const simulatedTime = formatCurrentDateTime();
  const betData = {
    ...data.CancelBet,
    message: {
      ...data.CancelBet.message,
      OperationId: nanoid(20),
      UpdateTime: simulatedTime,
      UserId: userId,
      Txns: [
        {
          ...data.CancelBet.message.Txns[0],
          CreditAmount: BetAmount,
          RefId: RefId,
        },
        ...data.ConfirmBet.message.Txns.slice(1),
      ],
    },
  };
  return betData;
};

const getSettleBetData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBet;
  const txId =
    store?.getState()?.singleBet?.betData?.confirmBet?.request?.message?.Txns[0]
      .TxId;
  const simulatedTime = formatCurrentDateTime();
  const simulatedDate = formatCurrentDate();
  const userId = store.getState().userInfo.userId;
  const { BetAmount, RefId } = placeBetData.request?.message;

  const betData = {
    ...data.Settle,
    message: {
      ...data.Settle.message,
      OperationId: nanoid(20),
      Txns: [
        {
          ...data.Settle.message.Txns[0],
          CreditAmount: BetAmount,
          Payout: BetAmount,
          UserId: userId,
          RefId: RefId,
          TxId: txId,
          SettlementTime: simulatedTime,
          UpdateTime: simulatedTime,
          WinlostDate: simulatedDate,
        },
      ],
    },
  };
  return betData;
};

const getResettleBetData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBet;
  const txId =
    store?.getState()?.singleBet?.betData?.confirmBet?.request?.message?.Txns[0]
      .TxId;
  const simulatedTime = formatCurrentDateTime();
  const simulatedDate = formatCurrentDate();
  const userId = store.getState().userInfo.userId;
  const { BetAmount, RefId } = placeBetData.request?.message;
  const betData = {
    ...data.ReSettle,
    message: {
      ...data.ReSettle.message,
      OperationId: nanoid(20),
      Txns: [
        {
          ...data.ReSettle.message.Txns[0],
          Payout: BetAmount,
          UserId: userId,
          UpdateTime: simulatedTime,
          WinlostDate: simulatedDate,
          SettlementTime: simulatedTime,
          RefId: RefId,
          TxId: txId,
        },
        ...data.ReSettle.message.Txns.slice(1),
      ],
    },
  };
  return betData;
};

const getUnsettleBetData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBet;
  const userId = store.getState().userInfo.userId;
  const txId =
    store?.getState()?.singleBet?.betData?.confirmBet?.request?.message?.Txns[0]
      .TxId;
  const simulatedTime = formatCurrentDateTime();
  const { BetAmount, RefId } = placeBetData.request?.message;
  const betData = {
    ...data.UnSettle,
    message: {
      ...data.UnSettle.message,
      OperationId: nanoid(20),
      Txns: [
        {
          ...data.UnSettle.message.Txns[0],
          UserId: userId,
          RefId: RefId,
          UpdateTime: simulatedTime,
          DebitAmount: BetAmount,
          TxId: txId,
        },
        ...data.UnSettle.message.Txns.slice(1),
      ],
    },
  };
  return betData;
};

function generateRandomNumber(length) {
  if (length < 1) return "";

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
