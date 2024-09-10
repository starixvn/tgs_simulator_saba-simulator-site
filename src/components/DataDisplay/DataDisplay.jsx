//@ts-nocheck
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { betLookup } from "../../helper";
import {
  updateDisplayData,
  handleChangeState,
  updateCurrentState,
  restartSingleBetStore,
} from "../../store/slices/singleBetSlice";
import "./DataDisplay.css";
import { nanoid } from "nanoid";
import useSubmitEvent from "../../hooks/useSubmitEvent";

const DataDisplay = () => {
  const requestRef = useRef(null);

  const dispatch = useDispatch();

  const currentState = useSelector((state) => state.singleBet.currentState);
  const dataDisplay = useSelector(
    (state) => state.singleBet.betData[currentState]
  );
  const clickedButtons = useSelector((state) => state.singleBet.clickedButtons);
  const isViewData = clickedButtons.includes(currentState);

  const { handleActionClick, handleOnSubmit } = useSubmitEvent();

  const onAutoClickHandle = async (actions) => {
    for (let i = 0; i < actions.length; i++) {
      await handleActionClick(actions[i]);
      await handleOnSubmit(actions[i], requestRef.current.value);
      await delay(1000);
    }
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return (
    <div className="data-container" key={nanoid(20)}>
      <div className="data-row">
        <div className="data-box">
          <h3>Request Body</h3>
          <textarea
            ref={requestRef}
            className="json-editor"
            rows={15}
            defaultValue={JSON.stringify(dataDisplay?.request, null, 2)}
            disabled={isViewData}
          />
        </div>
        <div className="data-box">
          <h3>Response Body</h3>
          <textarea
            disabled
            className="json-editor"
            rows={8}
            defaultValue={
              dataDisplay?.response
                ? JSON.stringify(dataDisplay?.response, null, 2)
                : null
            }
          />
        </div>
      </div>
      <br />

      {!isViewData && (
        <button
          className="submit-btn"
          onClick={() => handleOnSubmit(currentState, requestRef.current.value)}
        >
          Submit
        </button>
      )}
      <button
        className="submit-btn"
        onClick={() =>
          onAutoClickHandle(["placeBet", "confirmBet", "settleBet"])
        }
      >
        Auto Submit Single Bet
      </button>
    </div>
  );
};

export default DataDisplay;
