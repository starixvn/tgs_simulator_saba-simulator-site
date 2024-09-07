import "./Popup.css";
import data from "../../constant/Data.json";
import { useState } from "react";
import { placeBetApi, confirmBetApi, canCelBetApi } from "../../services/api";
import Dialog from "../Dialog/Dialog";
import { nanoid } from "nanoid";
const Popup = () => {
  const {
    message: { HomeName, AwayName, HomeScore, AwayScore, LeagueName, UserId },
  } = data.PlaceBet;
  // @ts-ignore
  const [betAmount, setBetAmount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const uniqueId = nanoid(20);

  const handlePlaceBet = async () => {
    const betData = {
      ...data.PlaceBet,
      message: {
        ...data.PlaceBet.message,
        BetAmount: betAmount,
        DebitAmount: betAmount,
        ActualAmount: betAmount,
        OperationId: uniqueId,
      },
    };

    // @ts-ignore
    const response = await placeBetApi(betData);
    setApiResponse(response);
    setIsDialogOpen(true);
    console.log("Bet placed successfully:", response);
  };

  const handleConfirmBet = async () => {
    const betData = {
      ...data.ConfirmBet,
      message: {
        ...data.ConfirmBet.message,
        OperationId: uniqueId,
        ActualAmount: betAmount,
      },
    };
    betData.message.Txns[0].TxId = apiResponse?.licenseeTxId;

    // @ts-ignore
    const response = await confirmBetApi(betData);
    setApiResponse(response);
    setIsDialogOpen(true);
  };

  const handleCanCelBet = async () => {
    const betData = {
      ...data.CancelBet,
      message: {
        ...data.CancelBet.message,
        OperationId: uniqueId,
        CreditAmount: betAmount,
      },
    };
    betData.message.Txns[0].TxId = apiResponse?.licenseeTxId;

    // @ts-ignore
    const response = await canCelBetApi(betData);
    setApiResponse(response);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="popup">
      <p>user Id : {UserId} </p>
      <header className="popup-header">
        <h3>{LeagueName}</h3>
      </header>
      <div className="popup-body">
        <div className="match-info">
          <div className="team team-home">
            <span>{HomeName}</span>
          </div>
          <div className="match-score">
            <span>Live</span>
            <div className="score">
              {HomeScore} - {AwayScore}
            </div>
          </div>
          <div className="team team-away">
            <span>{AwayName} </span>
          </div>
        </div>
        <div className="bet-tabs"></div>
        <div>
          <label> Bet Amount </label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => {
              setBetAmount(e.target.value);
            }}
          />
        </div>

        <div className="bet-footer">
          <button className="place-bet" onClick={handlePlaceBet}>
            Place Bet
          </button>
          <button className="confirm-bet" onClick={handleConfirmBet}>
            Confirm Bet
          </button>
          <button className="cancel-bet" onClick={handleCanCelBet}>
            Cancel Bet
          </button>
        </div>
      </div>
      <Dialog
        apiResponse={apiResponse}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default Popup;
