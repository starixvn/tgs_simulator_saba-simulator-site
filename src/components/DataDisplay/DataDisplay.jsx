//@ts-nocheck
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { betLookup } from "../../helper";
import { TailSpin } from "react-loader-spinner";
import {
  updateDisplayData,
  handleChangeState,
  updateCurrentState,
  restartSingleBetStore,
  updateStateRetry,
} from "../../store/slices/singleBetSlice";

import { nanoid } from "nanoid";
import SimulatorTab from "../Tab/SimulatorTab";

const DataDisplay = ({ children }) => {
  const requestRef = useRef(null);
  const dispatch = useDispatch();
  const { betData, betRetryData, currentState, scheduleData } = useSelector(
    (state) => state.singleBet
  );
  const tabValue = useSelector((state) => state.tabSimulator.tabValue);
  const dataDisplay = Boolean(currentState.retryId)
    ? betRetryData[currentState.type].find(
        (x) => x.retryId === currentState.retryId
      )
    : betData[currentState.type];

  const [loading, setLoading] = useState(false);

  const clickedButtons = useSelector((state) => state.singleBet.clickedButtons);
  const isViewData = clickedButtons
    .filter((item) => item !== "cancelBetParlay" && item !== "cancelBet")
    .includes(currentState.type);

  const handleOnSubmitManual = async (betAction, requestRaw) => {
    const response = await betLookup[betAction]?.callApi(requestRaw);
    dispatch(
      updateDisplayData({
        type: betAction,
        request: JSON.parse(requestRaw),
        response: response,
      })
    );
    if (response.status === "0") {
      dispatch(handleChangeState(betAction));
    }
  };

  const handleOnSubmitSchedule = async (betAction, requestRaw) => {
    let count = 0;
    let acceptedAction = null;
    setLoading(true);

    const callApiWithDelay = async () => {
      if (count >= parseInt(scheduleData.loop)) {
        setLoading(false);
        acceptedAction && dispatch(handleChangeState(betAction));
        acceptedAction && dispatch(updateDisplayData(acceptedAction));
        return;
      }

      const response = await betLookup[betAction]?.callApi(requestRaw);

      if (response.status === "0") {
        acceptedAction = {
          type: betAction,
          request: JSON.parse(requestRaw),
          response,
        };
      }
      const retryId = nanoid(20);
      response.retryId = retryId;
      dispatch(
        updateStateRetry({
          type: betAction,
          request: JSON.parse(requestRaw),
          response,
          retryId: retryId,
        })
      );
      dispatch(updateCurrentState({ type: betAction, retryId: retryId }));
      count++;

      setTimeout(callApiWithDelay, scheduleData.interval * 1000);
    };

    callApiWithDelay();
  };

  const handleOnSubmit = (betAction, requestRaw) => {
    if (tabValue === "manual") {
      handleOnSubmitManual(betAction, requestRaw);
    }
    if (tabValue === "schedule") {
      handleOnSubmitSchedule(betAction, requestRaw);
    }
  };

  return (
    <div className="data-container" key={nanoid(20)}>
      {children}
      <div className="data-row">
        <div className="data-box">
          <textarea
            placeholder="Request Body"
            ref={requestRef}
            className="json-editor"
            rows={15}
            defaultValue={JSON.stringify(dataDisplay?.request, null, 2)}
            disabled={isViewData}
          />
        </div>
        <div className="data-box">
          <textarea
            disabled
            className="json-editor"
            placeholder="Response"
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
      {loading && <LoadingOverlay />}
      {!isViewData && (
        <button
          className="submit-btn"
          onClick={() =>
            handleOnSubmit(currentState.type, requestRef.current.value)
          }
        >
          Submit
        </button>
      )}
    </div>
  );
};

function LoadingOverlay() {
  const [loading, setLoading] = useState(true);

  return (
    loading && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TailSpin height={80} width={80} color="white" />
      </div>
    )
  );
}
export default DataDisplay;
