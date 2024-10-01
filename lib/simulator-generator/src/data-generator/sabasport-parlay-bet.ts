import data from "../../seed-data/betData.json";
import { nanoid } from "nanoid";
import { DateHelper, NumberHelper } from "../utils";

export const getPlaceBetParlayData = (userId: string) => {
  const now = DateHelper.formatCurrentDateTime();

  const betData = {
    key: nanoid(10),
    message: {
      ...data.PlaceBetParlay.message,
      OperationId: nanoid(20),
      UserId: userId,
      BetTime: now,
      UpdateTime: now,
      CreditAmount: 0,
      Txns: data.PlaceBetParlay.message.Txns.map((item) => ({
        ...item,
        RefId: `simulator_${nanoid(15)}`,
      })),
    },
  };

  return betData;
};

export const getConfirmBetParlayData = (
  placeBetRequest,
  placeBetResponse
) => {
  const { UserId, UpdateTime, CreditAmount, DebitAmount } = placeBetRequest;

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
      OperationId: nanoid(20),
      UserId: UserId,
      UpdateTime: UpdateTime,
      CreditAmount: CreditAmount,
      DebitAmount: DebitAmount,
      TransactionTime: UpdateTime,
      Txns: placeBetRequest.message.Txns.map((index) => ({
        ...data.ConfirmBetParlay.message.Txns[index],
        LicenseeTxId: placeBetResponse.txns[index].licenseeTxId,
        RefId: placeBetRequest.message.Txns[index].RefId,
        ActualAmount: placeBetRequest.message.Txns[index].BetAmount,
        TxId: NumberHelper.generateRandomNumber(18),
      })),
      TicketDetail: placeBetRequest.message.TicketDetail.map(getTicketDetail),
    },
  };
};

export const getCancelBetParlayData = (placeBetRequest) => {
  const { UserId } = placeBetRequest.message;

  const betData = {
    key: nanoid(10),
    message: {
      ...data.CancelBet.message,
      OperationId: nanoid(20),
      UserId: UserId,
      Txns: placeBetRequest.message.Txns.map((item) => ({
        ...data.CancelBet.message.Txns[0],
        CreditAmount: item.DebitAmount,
        DebitAmount: item.CreditAmount,
        RefId: item.RefId,
      })),
    },
  };
  return betData;
};

export const getSettleBetParlayData = (
  placeBetRequest,
  confirmBetRequest
) => {
  const { UserId } = placeBetRequest.message;

  const betData = {
    key: nanoid(10),

    message: {
      ...data.Settle.message,
      OperationId: nanoid(20),
      Txns: placeBetRequest.message.Txns.map((item, index) => {
        let actualAmount = confirmBetRequest.message.Txns[index].ActualAmount;
        const odds = confirmBetRequest.message.Txns[index].Odds;
        const isWon = data.Settle.message.Txns[0].Status === "won";
        if (Boolean(odds) && isWon) {
          actualAmount += actualAmount * odds;
        }

        return {
          ...data.Settle.message.Txns[0],
          UserId: UserId,
          RefId: confirmBetRequest.message.Txns[index].RefId,
          TxId: confirmBetRequest.message.Txns[index].TxId,
          Payout: actualAmount,
          CreditAmount: actualAmount,
        };
      }),
    },
  };

  return betData;
};

export const getResettleParlayBetData = (
  placeBetRequest,
  confirmBetRequest,
  settleBetRequest
) => {
  const { UserId } = placeBetRequest.message;

  const betData = {
    key: nanoid(10),
    message: {
      ...data.ReSettle.message,
      OperationId: nanoid(20),
      Txns: placeBetRequest.message.Txns.map((item, index) => {
        const { Payout, Status } = settleBetRequest.message.Txns[index];
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

        return {
          ...data.ReSettle.message.Txns[0],
          ...finalBetData,
          UserId: UserId,
          RefId: confirmBetRequest.message.Txns[index].RefId,
          TxId: confirmBetRequest.message.Txns[index].TxId,
        };
      }),
    },
  };
  return betData;
};

export const getUnsettleParlayBetData = (
  placeBetRequest,
  settleBetRequest,
) => {
  const { UserId } = placeBetRequest.message;

  const betData = {
    key: nanoid(10),
    message: {
      ...data.UnSettle.message,
      OperationId: nanoid(20),
      Txns: placeBetRequest.message.Txns.map((item, index) => {
        const { Payout, Status } = settleBetRequest.message.Txns[index];
        return {
          ...data.UnSettle.message.Txns[0],
          UserId: UserId,
          RefId: settleBetRequest.message.Txns[index].RefId,
          TxId: settleBetRequest.message.Txns[index].TxId,
          CreditAmount: Status == "won" ? Payout : 0,
          DebitAmount: Status == "won" ? 0 : Payout,
        };
      }),
    },
  };
  return betData;
};
