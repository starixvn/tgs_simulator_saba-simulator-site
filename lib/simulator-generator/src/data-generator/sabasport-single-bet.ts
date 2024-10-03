import Nanoid from '~/utils/CustomNanoid';
import data from '../../seed-data/betData.json';
import { DateHelper, NumberHelper } from '../utils'

const requestPrefix = 'loadtest_';
const betAmount = 7;

export const getBalanceRequest = (userId: string) => {
  return {
    key: Nanoid(10),
    message: {
      ...data.GetBalance,
      UserId:  userId
    }
  }
}

export const generateBetRequest = (userId: string) => {  
  const simulatedTime = DateHelper.formatCurrentDateTime();

  return {
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
      RefId: `${requestPrefix}${Nanoid(15)}`,
      OperationId: Nanoid(20),
      UserId: userId,
    },
  };
};

export const getCancelBetRequest = (placeBetRequest) => {
  const { BetAmount, RefId } = placeBetRequest.message;

  const userId = placeBetRequest.message.UserId;
  const simulatedTime = DateHelper.formatCurrentDateTime();
  const betData = {
    ...data.CancelBet,
    message: {
      ...data.CancelBet.message,
      OperationId: Nanoid(20),
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

export const getConfirmBetRequest = (userId, placeBetResult) => {
  const { refId, licenseeTxId } = placeBetResult;
  const simulatedTime = DateHelper.formatCurrentDateTime();
  const simulatedDate = DateHelper.formatCurrentDate();

  return  {
    ...data.ConfirmBet,
    message: {
      ...data.ConfirmBet.message,
      OperationId: Nanoid(20),
      UpdateTime: simulatedTime,
      TransactionTime: simulatedTime,
      UserId: userId,
      Txns: [
        {
          ...data.ConfirmBet.message.Txns[0],
          LicenseeTxId: licenseeTxId,
          RefId: refId,
          TxId: NumberHelper.generateRandomNumber(18),
          WinlostDate: simulatedDate,
          ActualAmount: betAmount,
        },
        ...data.ConfirmBet.message.Txns.slice(1),
      ],
    },
  };
};

export const getSettlleBetRequest = (userId, confirmBetRequest) => {
  let { ActualAmount } = confirmBetRequest.message.Txns[0];
  const { RefId, TxId, Odds } = confirmBetRequest.message.Txns[0];

  const simulatedTime = DateHelper.formatCurrentDateTime();
  const simulatedDate = DateHelper.formatCurrentDate();

  const isWon = true;

  if (Boolean(Odds) && isWon) {
    ActualAmount += ActualAmount * Odds;
  }
  const betData = {
    ...data.Settle,
    message: {
      ...data.Settle.message,
      OperationId: Nanoid(20),
      Txns: [
        {
          ...data.Settle.message.Txns[0],
          CreditAmount: ActualAmount,
          Payout: ActualAmount,
          UserId: userId,
          RefId: RefId,
          TxId: TxId,
          SettlementTime: simulatedTime,
          UpdateTime: simulatedTime,
          WinlostDate: simulatedDate,
        },
      ],
    },
  };
  return betData;
};

export const getResettleBetRequest = (userId, confirmBetRequest, settleBetRequest) => {
  const { Payout, RefId, Status } = settleBetRequest.message.Txns[0];
  const txId = confirmBetRequest.message.Txns[0].TxId;

  const simulatedTime = DateHelper.formatCurrentDateTime();
  const simulatedDate = DateHelper.formatCurrentDate();
  
  const finalBetData =
    Status === "won"
      ? {
          Payout: Payout,
          CreditAmount: Payout,
          DebitAmount: 0,
          Status,
        }
      : {
          Payout: 0,
          CreditAmount: 0,
          DebitAmount: Payout,
          Status,
        };
  const betData = {
    ...data.ReSettle,
    message: {
      ...data.ReSettle.message,
      OperationId: Nanoid(20),
      Txns: [
        {
          ...data.ReSettle.message.Txns[0],
          ...finalBetData,
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

export const getUnsettleBetRequest = (userId, confirmBetRequest, settleBetRequest) => {
  const { Payout, RefId, Status } = settleBetRequest.message.Txns[0];

  const txId = confirmBetRequest.message?.Txns[0].TxId;

  const simulatedTime = DateHelper.formatCurrentDateTime();

  const betData = {
    ...data.UnSettle,
    message: {
      ...data.UnSettle.message,
      OperationId: Nanoid(20),
      Txns: [
        {
          ...data.UnSettle.message.Txns[0],
          UserId: userId,
          RefId: RefId,
          UpdateTime: simulatedTime,
          CreditAmount: Status == "won" ? Payout : 0,
          DebitAmount: Status == "won" ? 0 : Payout,
          TxId: txId,
        },
        ...data.UnSettle.message.Txns.slice(1),
      ],
    },
  };
  return betData;
};
