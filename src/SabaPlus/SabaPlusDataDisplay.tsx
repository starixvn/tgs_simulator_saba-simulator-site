import { nanoid } from "nanoid";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDisplayData,
  handleChangeState,
  updateStateRetry,
  updateCurrentState,
} from "../store/slices/sabaPlusSlice";

import { sabaPlusLookup } from "../helper/sabaPlusHelper";

const SabaPlusDataDisplay = ({ children }) => {
  const requestRef = useRef(null);
  const dispatch = useDispatch();
  const { betData, currentState, clickedButtons, betRetryData } = useSelector(
    (state) => state.sabaPlus
  );
  const dataDisplay = currentState.retryId
    ? betRetryData[currentState.type].find(
        (x) => x.retryId === currentState.retryId
      )
    : betData[currentState.type];

  const isViewData =
    currentState.retryId ||
    clickedButtons
      .filter((item) => item !== "placeBet")
      .includes(currentState.type);
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

      {!isViewData && (
        <button
          className="submit-btn"
          onClick={() =>
            handleOnSubmitManual(currentState?.type, requestRef.current.value)
          }
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default SabaPlusDataDisplay;
