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

const DataDisplay = () => {
  const requestRef = useRef(null);

  const dispatch = useDispatch();

  const currentState = useSelector((state) => state.singleBet.currentState);
  const dataDisplay = useSelector(
    (state) => state.singleBet.betData[currentState]
  );
  const clickedButtons = useSelector((state) => state.singleBet.clickedButtons);
  const isViewData = clickedButtons.filter(item => item !== 'cancelBetParlay' && item !== 'cancelBet').includes(currentState);

  const handleOnSubmit = async (betAction, params) => {
    const response = await betLookup[betAction]?.callApi(params);
    dispatch(
      updateDisplayData({
        type: betAction,
        request: JSON.parse(params),
        response: response,
      })
    );
    if (response.status === "0") {
      dispatch(handleChangeState(betAction));
    }
  };

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
      {/* {!currentState && (
        <button
          button
          className="submit-btn"
          onClick={() =>
            onAutoClickHandle(["placeBet", "confirmBet", "settleBet"])
          }
        >
          Auto Submit
        </button>
      )} */}
    </div>
  );
};

export default DataDisplay;
