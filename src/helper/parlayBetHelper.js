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
import { formatCurrentDateTime } from "./datetimeHelper";

const getPlaceBetParlayData = () => {
  const betAmount = Math.round(Math.random() * 9 * 100) / 100;
  const shouldSetCreditAmount = Math.random() >= 0.5;
  const shouldNegativeOdds = Math.random() >= 0.5;

  const now = formatCurrentDateTime();

  const betData = {
    key: nanoid(10),
    message: {
      ...data.PlaceBetParlay.message,
      OperationId: nanoid(20),
      UserId: store.getState().userInfo.userId,
      BetTime: now,
      UpdateTime: now,
      CreditAmount: 0,
      Txns: data.PlaceBetParlay.message.Txns.map((item, index) => ({
        ...item,
        RefId: `simulator_${nanoid(15)}`,
        Detail: item.ParlayType.includes("SingleBet_") ? [{
          MatchId: generateRandomNumber(10)
        }] : item.Detail
      })),
    },
  };

  betData.message.TicketDetail = betData.message.TicketDetail.map((item, index) => ({
    ...item,
    MatchId: betData.message.Txns.filter(txn => txn.ParlayType.includes("SingleBet_"))[index].Detail.MatchId,
    HomeId: generateRandomNumber(6),
    AwayId: generateRandomNumber(6)
  }))

  return betData;
};

const getConfirmBetParlayData = () => {
  const now = new Date();

  const placeBetData = store?.getState()?.singleBet?.betData?.placeBetParlay;

  const { OperationId, UserId, UpdateTime, CreditAmount, DebitAmount } = placeBetData.request?.message;
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
      TransactionTime: UpdateTime,
      Txns: placeBetData.request?.message.Txns.map((item, index) => ({
        ...data.ConfirmBetParlay.message.Txns[index],
        LicenseeTxId: placeBetData.response.txns[index].licenseeTxId,
        RefId: placeBetData.request.message.Txns[index].RefId,
        TxId: generateRandomNumber(18),
      })),
      TicketDetail: placeBetData.request.message.TicketDetail.map(getTicketDetail),
    },
  };
};

const getCancelBetParlayData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBetParlay;
  const { OperationId, UserId, CreditAmount, DebitAmount } = placeBetData.request?.message;
  const betData = {
    key: nanoid(10),
    message: {
      ...data.CancelBet.message,
      OperationId: OperationId,
      UserId: UserId,
      Txns: placeBetData.request.message.Txns.map((item, index) => ({
        ...data.CancelBet.message.Txns[0],
        CreditAmount: item.DebitAmount,
        DebitAmount: item.CreditAmount,
        RefId: item.RefId,
      }))
    }   
  };
  return betData;
};

const getSettleBetParlayData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBetParlay;
  const confirmBetParlay =
    store?.getState()?.singleBet?.betData?.confirmBetParlay;

  const { OperationId, UserId } = placeBetData.request?.message;

  const betData = {
    key: nanoid(10),
    message: {
      ...data.Settle.message,
      OperationId: OperationId,
      Txns: placeBetData.request.message.Txns.map((item, index) => ({
        ...data.Settle.message.Txns[0],
        UserId: UserId,
        RefId: confirmBetParlay.request.message.Txns[index].RefId,
        TxId: confirmBetParlay.request.message.Txns[index].TxId,
      })),
    },
  };

  return betData;
};

const getResettleParlayBetData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBetParlay;
  const confirmBetParlay = store?.getState()?.singleBet?.betData?.confirmBetParlay;

  const { OperationId, UserId } = placeBetData.request?.message;
  const betData = {
    key: nanoid(10),
    message: {
      ...data.ReSettle.message,
      OperationId: OperationId,
      Txns: placeBetData.request.message.Txns.map((item, index) => ({
        ...data.ReSettle.message.Txns[0],
        UserId: UserId,
        RefId: confirmBetParlay.request.message.Txns[index].RefId,
        TxId: confirmBetParlay.request.message.Txns[index].TxId,
        CreditAmount: item.CreditAmount,
        DebitAmount: item.DebitAmount,
      })),
    },
  };
  return betData;
};

const getUnsettleParlayBetData = () => {
  const placeBetData = store?.getState()?.singleBet?.betData?.placeBetParlay;
  const confirmBetParlay = store?.getState()?.singleBet?.betData?.confirmBetParlay;

  const { OperationId, UserId } = placeBetData.request?.message;
  const betData = {
    key: nanoid(10),
    message: {
      ...data.UnSettle.message,
      OperationId: OperationId,
      Txns: placeBetData.request.message.Txns.map((item, index) => ({
        ...data.UnSettle.message.Txns[0],
        UserId: store.getState().userInfo.userId,
        RefId: confirmBetParlay.request.message.Txns[index].RefId,
        TxId: confirmBetParlay.request.message.Txns[index].TxId,
        CreditAmount: item.CreditAmount,
        DebitAmount: item.DebitAmount,
      }))
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

const parlayBetLookup = {
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
  settleBetParlay: {
    getSampleData: getSettleBetParlayData,
    callApi: settleBetApi,
    label: "Settle Bet Parlay",
  },
  resettleBetParlay: {
    getSampleData: getResettleParlayBetData,
    callApi: reSettleBetApi,
    label: "Resettle Bet Parlay",
  },
  unsettleBetParlay: {
    getSampleData: getUnsettleParlayBetData,
    callApi: unSettleBetApi,
    label: "Unsettle Bet Parlay",
  },
  cancelBetParlay: {
    getSampleData: getCancelBetParlayData,
    callApi: canCelBetApi,
    label: "Cancel Bet Parlay",
  },
};

export default parlayBetLookup;
