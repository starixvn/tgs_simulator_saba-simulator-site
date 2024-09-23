/* eslint-disable @typescript-eslint/no-unused-expressions */
//@ts-nocheck
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDisplayData,
  handleChangeState,
  updateStateRetry,
  updateCurrentState,
} from "../store/slices/sabaPlusSlice";
import { sabaPlusLookup } from "../helper/sabaPlusHelper";
import LoadingOverlay from "../components/LoadingOverlay/LoadingOverlay";

const SabaPlusDataDisplay = ({ children }) => {
  const requestRef = useRef(null);
  const dispatch = useDispatch();
  const { betData, currentState, clickedButtons, betRetryData, scheduleData } =
    useSelector((state) => state.sabaPlus);
  const [loading, setLoading] = useState(false);
  const tabValue = useSelector((state) => state.tabSimulator.tabValue);

  const dataDisplay = currentState.retryId
    ? betRetryData[currentState.type].find(
        (x) => x.retryId === currentState.retryId
      )
    : betData[currentState.type];

  const isViewData =
    tabValue === "manual"
      ? currentState.retryId ||
        clickedButtons
          .filter((item) => item !== "placeBet")
          .includes(currentState.type)
      : clickedButtons.includes(currentState.type);

  const handleOnSubmitManual = async (betAction, requestRaw) => {
    const response = await sabaPlusLookup[betAction]?.callApi(requestRaw);

    if (betAction === "placeBet") {
      const retryId = nanoid(20);
      dispatch(
        updateStateRetry({
          type: betAction,
          request: JSON.parse(requestRaw),
          response,
          retryId: retryId,
        })
      );
      dispatch(updateCurrentState({ type: betAction, retryId: retryId }));
      if (response.ErrorCode === 0 && !clickedButtons.includes("placeBet")) {
        dispatch(handleChangeState(betAction));
      }

      return;
    }

    dispatch(
      updateDisplayData({
        type: betAction,
        request: JSON.parse(requestRaw),
        response: response,
      })
    );
    dispatch(updateCurrentState({ type: betAction, retryId: null }));
    if (response.ErrorCode === 0) {
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

      const response = await sabaPlusLookup[betAction]?.callApi(requestRaw);

      if (response.ErrorCode === 0) {
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
      {loading && <LoadingOverlay></LoadingOverlay>}
      {!isViewData && (
        <button
          className="submit-btn"
          onClick={() =>
            handleOnSubmit(currentState?.type, requestRef.current.value)
          }
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default SabaPlusDataDisplay;
