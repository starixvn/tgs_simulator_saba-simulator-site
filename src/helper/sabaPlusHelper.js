import spPlusData from "../constant/SabaPlusData.json";
import moment from "moment-timezone";
import store from "../store/store";
import {
  placeBetApi,
  endGameApi,
  placeBetAndSettleApi,
  voidGameApi,
  freeSpinApi,
} from "../services/sabaPlusApi";
import { nanoid } from "nanoid";

const getPlaceBetSBPlusData = () => {
  const operatorCustId = store?.getState().userInfo.userId;
  const gameId = generateRandomNumber(4);
  const gameRoundId = `simulator_${gameId}_${generateRandomNumber(8)}`;
  const ticketNo = `${gameId}|$|${operatorCustId}|$|${gameRoundId}`;
  const stake = generateRandomStake();

  const vendor = getProviderRandomAndGameType();

  const walletSiteTokenParts = spPlusData.placeBet.Payload.WalletSideToken.split('@');
  walletSiteTokenParts[0] = vendor.GameProviderCode;
  const walletSiteToken = walletSiteTokenParts.join('@');

  return {
    ...spPlusData.placeBet,
    Seq: `${nanoid(8)}-${nanoid(4)}-${nanoid(4)}-${nanoid(4)}-${nanoid(8)}`,
    TimeStamp: moment().tz("UTC").format("YYYY/MM/DD HH:mm:ss.SSS"),
    Payload: {
      ...spPlusData.placeBet.Payload,
      OperatorCustId: operatorCustId,
      WalletSideToken: walletSiteToken,
      GameType: vendor.GameType,
      GameProviderCode: vendor.GameProviderCode,
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

const getPlaceFreeSpinSBPlusData = () => {
  const operatorCustId = store?.getState().userInfo.userId;
  const gameId = generateRandomNumber(4);
  const gameRoundId = `simulator_${gameId}_${generateRandomNumber(8)}`;
  const ticketNo = `${gameId}|$|${operatorCustId}|$|${gameRoundId}`;

  const vendor = getProviderRandomAndGameType();
  const walletSiteTokenParts = spPlusData.placeBet.Payload.WalletSideToken.split('@');
  walletSiteTokenParts[0] = vendor.GameProviderCode;
  const walletSiteToken = walletSiteTokenParts.join('@');

  return {
    ...spPlusData.placeFreeSpin,
    Seq: `${nanoid(8)}-${nanoid(4)}-${nanoid(4)}-${nanoid(4)}-${nanoid(8)}`,
    TimeStamp: moment().tz("UTC").format("YYYY/MM/DD HH:mm:ss.SSS"),
    Payload: {
      ...spPlusData.placeFreeSpin.Payload,
      WalletSideToken: walletSiteToken,
      OperatorCustId: operatorCustId,
      GameType: vendor.GameType,
      GameProviderCode: vendor.GameProviderCode,
      BetDataSet: [
        {
          ...spPlusData.placeFreeSpin.Payload.BetDataSet[0],
          GameId: gameId,
          GameRoundId: gameRoundId,
          TicketNo: ticketNo,
          Stake: 0,
          ActualStake: 0,
        },
      ],
    },
  };
};

const getEndGameSBPlusData = () => {
  const clickedAction = store?.getState().sabaPlus.clickedButtons;
  const preRequest = clickedAction.includes("placeFreeSpin")
    ? store?.getState().sabaPlus.betData.placeFreeSpin.request
    : store?.getState().sabaPlus.betData.placeBet.request;

  const betData = preRequest.Payload.BetDataSet[0];
  const operatorCustId = store?.getState().userInfo.userId;
  const { GameId, GameRoundId, TicketNo, ActualStake } = betData;

  const endGameData = {
    ...spPlusData.endGame,
    Seq: `${nanoid(8)}-${nanoid(4)}-${nanoid(4)}-${nanoid(4)}-${nanoid(8)}`,
    TimeStamp: moment().tz("UTC").format("YYYY/MM/DD HH:mm:ss.SSS"),
    Payload: {
      ...spPlusData.endGame.Payload,
      OperatorCustId: operatorCustId,
      GameType: preRequest.Payload.GameType,
      BetDataSet: [
        {
          ...spPlusData.endGame.Payload.BetDataSet[0],
          GameId: GameId,
          GameRoundId: GameRoundId,
          TicketNo: TicketNo,
          ActualStake: ActualStake,
          SettleDate: moment().tz("UTC").format("YYYY/MM/DD HH:mm:ss.SSS"),
          SettleDateWithTz: moment().tz("UTC").format("YYYY-MM-DDTHH:mm:ssZ"),
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
  const stake = generateRandomStake();

  const vendor = getProviderRandomAndGameType();
  const walletSiteTokenParts = spPlusData.placeBet.Payload.WalletSideToken.split('@');
  walletSiteTokenParts[0] = vendor.GameProviderCode;
  const walletSiteToken = walletSiteTokenParts.join('@');

  return {
    ...spPlusData.placeBetAndSettle,
    Seq: `${nanoid(8)}-${nanoid(4)}-${nanoid(4)}-${nanoid(4)}-${nanoid(8)}`,
    TimeStamp: moment().tz("UTC").format("YYYY/MM/DD HH:mm:ss.SSS"),
    Payload: {
      ...spPlusData.placeBetAndSettle.Payload,
      WalletSideToken: walletSiteToken,
      OperatorCustId: operatorCustId,
      GameType: vendor.GameType,
      GameProviderCode: vendor.GameProviderCode,
      BetDataSet: [
        {
          ...spPlusData.placeBetAndSettle.Payload.BetDataSet[0],
          GameId: gameId,
          GameRoundId: gameRoundId,
          TicketNo: ticketNo,
          Stake: stake,
          ActualStake: stake,
          SettleDate: moment().tz("UTC").format("YYYY/MM/DD HH:mm:ss.SSS"),
          SettleDateWithTz: moment().tz("UTC").format("YYYY-MM-DDTHH:mm:ssZ"),
        },
      ],
    },
  };
};

const getVoidSBPlusData = () => {
  const preData = getPlaceBetData();
  const preRequest = preData.request;

  const operatorCustId = store?.getState().userInfo.userId;

  return {
    ...spPlusData.voidGame,
    Seq: `${nanoid(8)}-${nanoid(4)}-${nanoid(4)}-${nanoid(4)}-${nanoid(8)}`,
    TimeStamp: moment().tz("UTC").format("YYYY/MM/DD HH:mm:ss.SSS"),
    Payload: {
      ...spPlusData.voidGame.Payload,
      OperatorCustId: operatorCustId,
      GameType: preRequest.Payload.GameType,
      BetDataSet: preRequest.Payload.BetDataSet.map((item, index) => ({
        ...spPlusData.voidGame.Payload.BetDataSet[0],
        GameId: item.GameId,
        GameRoundId: item.GameRoundId,
        TicketNo: item.TicketNo,
      })),
    },
  };
};

const getFreeSpinSBPlusData = () => {
  const operatorCustId = store?.getState().userInfo.userId;
  const gameId = generateRandomNumber(4);
  const gameRoundId = `simulator_${gameId}_${generateRandomNumber(8)}`;
  const ticketNo = `${gameId}|$|${operatorCustId}|$|${gameRoundId}`;

  const vendor = getProviderRandomAndGameType();

  return {
    ...spPlusData.freeSpin,
    Seq: `${nanoid(8)}-${nanoid(4)}-${nanoid(4)}-${nanoid(4)}-${nanoid(8)}`,
    TimeStamp: moment().tz("UTC").format("YYYY/MM/DD HH:mm:ss.SSS"),
    Payload: {
      ...spPlusData.freeSpin.Payload,
      OperatorCustId: operatorCustId,
      GameType: vendor.GameType,
      BetDataSet: [
        {
          ...spPlusData.freeSpin.Payload.BetDataSet[0],
          GameId: gameId,
          GameRoundId: gameRoundId,
          TicketNo: ticketNo,
          Payout: generateRandomStake(),
          SettleDate: moment().tz("UTC").format("YYYY/MM/DD HH:mm:ss.SSS"),
        },
      ],
    },
  };
};

const getPlaceBetData = () => {
  const clickedAction = store?.getState().sabaPlus.clickedButtons;

  if (clickedAction.includes("placeFreeSpin")) {
    return store?.getState().sabaPlus.betData.placeFreeSpin;
  }

  if (clickedAction.includes("placeBetAndSettle")) {
    return store?.getState().sabaPlus.betData.placeBetAndSettle;
  }

  if (clickedAction.includes("freeSpin")) {
    return store?.getState().sabaPlus.betData.freeSpin;
  }

  return store?.getState().sabaPlus.betData.placeBet;
};

const generateRandomNumber = (length) =>
  Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, "0");

const generateRandomStake = () => {
  const min = 51;
  const max = 59;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getProviderRandomAndGameType = () => {
  const providerName = store?.getState().sabaPlus.vendorOptions.name;
  return {
    ProviderName: providerName,
    GameProviderCode: `SABAPLUS-${providerName}`,
    GameType: store?.getState().sabaPlus.vendorOptions.gameType
  }
}

const sabaPlusLookup = {
  standaloneVoid: {
    getSampleData: () => spPlusData.voidGame,
    callApi: voidGameApi,
    label: "Void",
  },
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
    callApi: placeBetAndSettleApi,
    label: "Place Bet And Settle",
  },
  placeFreeSpin: {
    getSampleData: getPlaceFreeSpinSBPlusData,
    callApi: placeBetApi,
    label: "Place Free Spin",
  },
  freeSpin: {
    getSampleData: getFreeSpinSBPlusData,
    callApi: freeSpinApi,
    label: "Free Spin",
  },
  voidGame: {
    getSampleData: getVoidSBPlusData,
    callApi: voidGameApi,
    label: "Void Game",
  },
};

export { sabaPlusLookup };
