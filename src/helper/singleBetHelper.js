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
import { nanoid } from "nanoid";

const getPlaceBetData = () => {
  let betAmount = Math.round(Math.random() * 9 * 100) / 100;
  const userId = store.getState().userInfo.userId;
  const betData = {
    ...data.PlaceBet,
    message: {
      ...data.PlaceBet.message,
      BetAmount: betAmount,
      DebitAmount: betAmount,
      ActualAmount: betAmount,
      RefId: nanoid(20),
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

  const betData = {
    ...data.ConfirmBet,
    message: {
      ...data.ConfirmBet.message,
      OperationId: nanoid(20),
      UserId: userId,
      Txns: [
        {
          ...data.ConfirmBet.message.Txns[0],
          LicenseeTxId: licenseeTxId,
          RefId: RefId,
          TxId: generateRandomNumber(18),
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
  const betData = {
    ...data.CancelBet,
    message: {
      ...data.CancelBet.message,
      OperationId: nanoid(20),
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
        },
        ...data.Settle.message.Txns.slice(1),
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
  const txId =
    store?.getState()?.singleBet?.betData?.confirmBet?.request?.message?.Txns[0]
      .TxId;
  const userId = store.getState().userInfo.userId;
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
          DebitAmount: BetAmount,
          TxId: txId,
        },
        ...data.UnSettle.message.Txns.slice(1),
      ],
    },
  };
  return betData;
};

const getPlaceBetParlayData = () => {
  const betAmount = Math.round(Math.random() * 9 * 100) / 100;
  const shouldSetCreditAmount = Math.random() >= 0.5;
  const shouldNegativeOdds = Math.random() >= 0.5;
  const refId = nanoid(13);
  const now = new Date();

  const betData = {
    key: nanoid(10),
    message: {
      ...data.PlaceBetParlay.message,
      OperationId: nanoid(20),
      UserId: store.getState().userInfo.userId,
      BetTime: now,
      UpdateTime: now,
      CreditAmount: shouldSetCreditAmount ? betAmount : 0,
      DebitAmount: shouldSetCreditAmount ? 0 : betAmount,
      ActualAmount: shouldNegativeOdds ? betAmount * 0.95 : betAmount,
      BetAmount: betAmount,
      Txns: [
        {
          ...data.PlaceBetParlay.message.Txns[0],
          RefId: nanoid(20),
        },
        {
          ...data.PlaceBetParlay.message.Txns[1],
          RefId: nanoid(20),
        },
      ],
    },
  };

  return betData;
};

const getConfirmBetParlayData = () => {
  const now = new Date();

  const placeBetData = store?.getState()?.singleBet?.betData?.placeBetParlay;

  const { OperationId, UserId, UpdateTime, CreditAmount, DebitAmount } =
    placeBetData.request?.message;
  const licenseeTxId = placeBetData?.response?.licenseeTxId;

  const getTicketDetail = (ticketDetail) => ({
    MatchId: ticketDetail.MatchId,
    SportType: ticketDetail.SportType,
    BetType: ticketDetail.BetType,
    OddsId: ticketDetail.OddsId,
    Odds: ticketDetail.Odds,
    OddsType: ticketDetail.OddsType,
    LeagueId: ticketDetail.LeagueId,
    IsOddsChanged: Math.random() >= 0.5,
  });

  return {
    key: nanoid(10),
    message: {
      ...data.ConfirmBetParlay.message,
      OperationId: OperationId,
      UserId: UserId,
      UpdateTime: UpdateTime,
      CreditAmount: CreditAmount,
      DebitAmount: DebitAmount,
      TransactionTime: now,
      Txns: [
        {
          ...data.ConfirmBetParlay.message.Txns[0],
          LicenseeTxId: placeBetData.response.txns[0].licenseeTxId,
          RefId: placeBetData.request.message.Txns[0].RefId,
          TxId: generateRandomNumber(18),
        },
        {
          ...data.ConfirmBetParlay.message.Txns[0],
          LicenseeTxId: placeBetData.response.txns[1].licenseeTxId,
          RefId: placeBetData.request.message.Txns[1].RefId,
          TxId: generateRandomNumber(18),
        },
      ],
      TicketDetail: [
        getTicketDetail(placeBetData.request.message.TicketDetail[0]),
        getTicketDetail(placeBetData.request.message.TicketDetail[1]),
      ],
    },
  };
};

function generateRandomNumber(length) {
  if (length < 1) return "";

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const singleBetLookup = {
  placeBetParlay: {
    getSampleData: getPlaceBetParlayData,
    callApi: placeBetParlayApi,
    label: "Place Bet Parlay",
  },

  confirmBetParlay: {
    getSampleData: getConfirmBetParlayData,
    callApi: confirmBetParlayApi,
    label: "Confirm Place Bet Parlay",
  },

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
