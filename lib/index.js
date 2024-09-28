import data from "./betData.json" with { type: "json" };
import { nanoid } from "nanoid";
import {formatCurrentDateTime,formatCurrentDate,generateRandomNumber } from './helper.js'

const betAmount = 7;

export const generateBetData = (userId) => {  
  const simulatedTime = formatCurrentDateTime();

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
      RefId: `simulator_${nanoid(15)}`,
      OperationId: nanoid(20),
      UserId: userId,
    },
  };
};

export  const getConfirmBetData = (userId , placeBetResult  ) => {
  const { refId, licenseeTxId } = placeBetResult;
  const simulatedTime = formatCurrentDateTime();
  const simulatedDate = formatCurrentDate();

  return  {
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
          RefId: refId,
          TxId: generateRandomNumber(18),
          WinlostDate: simulatedDate,
          ActualAmount: betAmount,
        },
        ...data.ConfirmBet.message.Txns.slice(1),
      ],
    },
  };
};

const getSettlleBetData = (userId ) => {
  const simulatedTime = formatCurrentDateTime();
  const simulatedDate = formatCurrentDate();


  const isWon = true;

  if (Boolean(odds) && isWon) {
    ActualAmount += ActualAmount * odds;
  }
  const betData = {
    ...data.Settle,
    message: {
      ...data.Settle.message,
      OperationId: nanoid(20),
      Txns: [
        {
          ...data.Settle.message.Txns[0],
          CreditAmount: ActualAmount,
          Payout: ActualAmount,
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

const a = getConfirmBetData("1234", {refId: "abcde",licenseeTxId: "heheheheh" });






