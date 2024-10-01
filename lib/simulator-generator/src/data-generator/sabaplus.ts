import moment from "moment-timezone";
import { nanoid } from "nanoid";
import spPlusData from "../../seed-data/SabaPlusData.json";
import {
  Provider,
  ProviderGameTypes,
} from "../../seed-data/Provider";

export const getPlaceBetSBPlusRequest = (operatorCustId: string) => {
  const gameId = generateRandomNumber(4);
  const gameRoundId = `simulator_${gameId}_${generateRandomNumber(8)}`;
  const ticketNo = `${gameId}|$|${operatorCustId}|$|${gameRoundId}`;

  const stake = generateRandomStake();

  const vendor = getProviderRandomAndGameType();

  const walletSiteTokenParts =
    spPlusData.placeBet.Payload.WalletSideToken.split("@");
  walletSiteTokenParts[0] = vendor.GameProviderCode;
  const walletSiteToken = walletSiteTokenParts.join("@");

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

export const getPlaceFreeSpinSBPlusRequest = (operatorCustId: string) => {
  const gameId = generateRandomNumber(4);
  const gameRoundId = `simulator_${gameId}_${generateRandomNumber(8)}`;
  const ticketNo = `${gameId}|$|${operatorCustId}|$|${gameRoundId}`;

  const vendor = getProviderRandomAndGameType();
  const walletSiteTokenParts =
    spPlusData.placeBet.Payload.WalletSideToken.split("@");
  walletSiteTokenParts[0] = vendor.GameProviderCode;
  const walletSiteToken = walletSiteTokenParts.join("@");

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

export const getPlaceBetAndSettleSBPlusRequest = (operatorCustId: string) => {
  const gameId = generateRandomNumber(4);
  const gameRoundId = `simulator_${gameId}_${generateRandomNumber(8)}`;
  const ticketNo = `${gameId}|$|${operatorCustId}|$|${gameRoundId}`;
  const stake = generateRandomStake();

  const vendor = getProviderRandomAndGameType();
  const walletSiteTokenParts =
    spPlusData.placeBet.Payload.WalletSideToken.split("@");
  walletSiteTokenParts[0] = vendor.GameProviderCode;
  const walletSiteToken = walletSiteTokenParts.join("@");

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

export const getEndGameSBPlusRequest = (placeBetRequest) => {
  const { GameId, GameRoundId, ActualStake, TicketNo, Stake } =
    placeBetRequest.Payload.BetDataSet[0];
  const operatorCustId = placeBetRequest.Payload.OperatorCustId;

  const endGameData = {
    ...spPlusData.endGame,
    Seq: `${nanoid(8)}-${nanoid(4)}-${nanoid(4)}-${nanoid(4)}-${nanoid(8)}`,
    TimeStamp: moment().tz("UTC").format("YYYY/MM/DD HH:mm:ss.SSS"),
    Payload: {
      ...spPlusData.endGame.Payload,
      OperatorCustId: operatorCustId,
      GameType: placeBetRequest.Payload.GameType,
      BetDataSet: [
        {
          ...spPlusData.endGame.Payload.BetDataSet[0],
          GameId: GameId,
          GameRoundId: GameRoundId,
          TicketNo: TicketNo,
          Stake: ActualStake,
          ActualStake: Stake,
          SettleDate: moment().tz("UTC").format("YYYY/MM/DD HH:mm:ss.SSS"),
          SettleDateWithTz: moment().tz("UTC").format("YYYY-MM-DDTHH:mm:ssZ"),
        },
      ],
    },
  };

  return endGameData;
};

export const getVoidSBPlusRequest = (placeBetRequest) => {
  return {
    ...spPlusData.voidGame,
    Seq: `${nanoid(8)}-${nanoid(4)}-${nanoid(4)}-${nanoid(4)}-${nanoid(8)}`,
    TimeStamp: moment().tz("UTC").format("YYYY/MM/DD HH:mm:ss.SSS"),
    Payload: {
      ...spPlusData.voidGame.Payload,
      OperatorCustId: placeBetRequest.Payload.OperatorCustId,
      GameType: placeBetRequest.Payload.GameType,
      BetDataSet: placeBetRequest.Payload.BetDataSet.map((item) => ({
        ...spPlusData.voidGame.Payload.BetDataSet[0],
        GameId: item.GameId,
        GameRoundId: item.GameRoundId,
        TicketNo: item.TicketNo,
      })),
    },
  };
};

export const getFreeSpinSBPlusRequest = (operatorCustId: string) => {
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

const generateRandomNumber = (length: number) =>
  Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, "0");

const generateRandomStake = () => {
  const min = 51;
  const max = 59;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getProviderRandomAndGameType = () => {
  const providerKeys = Object.values(Provider);
  const randomProvider = providerKeys[Math.floor(Math.random() * providerKeys.length)];

  const gameTypes = ProviderGameTypes[randomProvider];
  const randomGameType = gameTypes[Math.floor(Math.random() * gameTypes.length)];

  return {
    ProviderName: randomProvider,
    GameProviderCode: `SABAPLUS-${randomProvider}`,
    GameType: randomGameType,
  };
};
