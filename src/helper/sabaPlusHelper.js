import spPlusData from "../constant/SabaPlusData.json";
import moment from "moment";
import store from "../store/store";
import { placeBetApi, endGameApi } from "../services/sabaPlusApi";

const getPlaceBetSBPlusData = () => {
  const operatorCustId = store?.getState().userInfo.userId;
  const gameId = generateRandomNumber(4);
  const gameRoundId = `simulator_${gameId}_${generateRandomNumber(8)}`;
  const ticketNo = `${gameId}|$|${operatorCustId}|$|${gameRoundId}`;
  const stake = generateRandomStake(20);
  return {
    ...spPlusData.placeBet,
    TimeStamp: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
    Payload: {
      ...spPlusData.placeBet.Payload,
      OperatorCustId: operatorCustId,
      BetDataSet: [
        {
          ...spPlusData.placeBet.Payload.BetDataSet[0],

          GameId: gameId,
          GameRoundId: gameRoundId,
          TicketNo: ticketNo,
          Stake: stake,
          ActualStake: stake,
        },
      ],
    },
  };
};

const getEndGameSBPlusData = () => {
  const betData =
    store?.getState().sabaPlus.betData.placeBet.request.Payload.BetDataSet[0];
  const operatorCustId = store?.getState().userInfo.userId;
  const { GameId, GameRoundId, ActualStake, TicketNo, Stake } = betData;

  const endGameData = {
    ...spPlusData.endGame,
    TimeStamp: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
    Payload: {
      ...spPlusData.endGame.Payload,
      OperatorCustId: operatorCustId,
      BetDataSet: [
        {
          ...spPlusData.endGame.Payload.BetDataSet[0],
          GameId: GameId,
          GameRoundId: GameRoundId,
          TicketNo: TicketNo,
          Stake: ActualStake,
          ActualStake: Stake,
          SettleDate: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
          SettleDateWithTz: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
        },
      ],
    },
  };

  return endGameData;
};

const getPlaceBetAndSettleSBPlusData = () => {
  const operatorCustId = store?.getState().userInfo.userId;
  const gameId = generateRandomNumber(4);
  const gameRoundId = `simulator_${gameId}_${generateRandomNumber(8)}`;
  const ticketNo = `${gameId}|$|${operatorCustId}|$|${gameRoundId}`;
  const stake = generateRandomStake(20);
  return {
    ...spPlusData.placeBetAndSettle,
    TimeStamp: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
    Payload: {
      ...spPlusData.placeBetAndSettle.Payload,
      OperatorCustId: operatorCustId,
      BetDataSet: [
        {
          ...spPlusData.placeBetAndSettle.Payload.BetDataSet[0],
          GameId: gameId,
          GameRoundId: gameRoundId,
          TicketNo: ticketNo,
          Stake: stake,
          ActualStake: stake,
          SettleDate: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
          SettleDateWithTz: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
        },
      ],
    },
  };
};

const generateRandomNumber = (length) =>
  Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, "0");

const generateRandomStake = (max) => {
  return Math.floor(Math.random() * max);
};

const sabaPlusLookup = {
  placeBet: {
    getSampleData: getPlaceBetSBPlusData,
    callApi: placeBetApi,
    label: "Place Bet",
  },
  endGame: {
    getSampleData: getEndGameSBPlusData,
    callApi: endGameApi,
    label: "End Game",
  },
  placeBetAndSettle: {
    getSampleData: getPlaceBetAndSettleSBPlusData,
    callApi: () => "This is Call API for Place Bet And Settle Plus",
    label: "Place Bet And Settle",
  },
};

export { sabaPlusLookup };
