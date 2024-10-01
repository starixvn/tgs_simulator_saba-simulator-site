import data from '../../seed-data/betData.json' assert { type: "json" };
import { nanoid } from "nanoid";
import { DateHelper, NumberHelper } from '../utils/index.js'

const betAmount = 7;

export const generateBetData = (userId) => {  
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
      RefId: `simulator_${nanoid(15)}`,
      OperationId: nanoid(20),
      UserId: userId,
    },
  };
};

export  const getConfirmBetData = (userId , placeBetResult) => {
  const { refId, licenseeTxId } = placeBetResult;
  const simulatedTime = DateHelper.formatCurrentDateTime();
  const simulatedDate = DateHelper.formatCurrentDate();

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
          TxId: NumberHelper.generateRandomNumber(18),
          WinlostDate: simulatedDate,
          ActualAmount: betAmount,
        },
        ...data.ConfirmBet.message.Txns.slice(1),
      ],
    },
  };
};

export const getSettlleBetData = (userId, confirmBetRequest ) => {
  let { ActualAmount, RefId, TxId, Odds } = confirmBetRequest.message.Txns[0];

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
      OperationId: nanoid(20),
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

// export const getResettleBetData = (userId, confirmBetRequest ) => {
//   let { ActualAmount, RefId, TxId, Odds } = confirmBetRequest.message.Txns[0];

//   const simulatedTime = DateHelper.formatCurrentDateTime();
//   const simulatedDate = DateHelper.formatCurrentDate();

//   const isWon = true;

//   if (Boolean(Odds) && isWon) {
//     ActualAmount += ActualAmount * Odds;
//   }

//   const betData = {
//     ...data.Settle,
//     message: {
//       ...data.Settle.message,
//       OperationId: nanoid(20),
//       Txns: [
//         {
//           ...data.Settle.message.Txns[0],
//           CreditAmount: ActualAmount,
//           Payout: ActualAmount,
//           UserId: userId,
//           RefId: RefId,
//           TxId: TxId,
//           SettlementTime: simulatedTime,
//           UpdateTime: simulatedTime,
//           WinlostDate: simulatedDate,
//         },
//       ],
//     },
//   };
//   return betData;
// };


// const userId = 'Starix1SW_4unxqibsyzyd_test'
// const placeBetReq = generateBetData(userId)
// console.log(JSON.stringify(placeBetReq, null, 2))

// const placeBetRes = {
//   "status": "0",
//   "refId": "simulator_F6usa2CISK-5OIN",
//   "licenseeTxId": "5850",
//   "msg": ""
// }
// const confirmBetReq = getConfirmBetData(userId, placeBetRes);
// console.log(JSON.stringify(confirmBetReq, null, 2))

// const settleBetReq = getSettlleBetData(userId, confirmBetReq)
// console.log(JSON.stringify(settleBetReq, null, 2))
