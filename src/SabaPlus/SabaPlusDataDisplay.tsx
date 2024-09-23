import { nanoid } from "nanoid";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDisplayData,
  handleChangeState,
} from "../store/slices/sabaPlusSlice";

import { sabaPlusLookup } from "../helper/sabaPlusHelper";

const SabaPlusDataDisplay = ({ children }) => {
  const requestRef = useRef(null);
  const dispatch = useDispatch();
  const { betData, currentState, clickedButtons } = useSelector(
    (state) => state.sabaPlus
  );
  const dataDisplay = betData[currentState];
  const isViewData = clickedButtons
    .filter((item) => item !== "placeBet")
    .includes(currentState);
  const handleOnSubmitManual = async (betAction, requestRaw) => {
    const response = await sabaPlusLookup[betAction]?.callApi(requestRaw);

    dispatch(
      updateDisplayData({
        type: betAction,
        request: JSON.parse(requestRaw),
        response: response,
      })
    );

    if (response.ErrorCode === 0) {
      dispatch(handleChangeState(betAction));
    }
  };

  // const handleOnSubmitSchedule = async (betAction, requestRaw) => {
  //   let acceptedAction = null;
  //   setLoading(true);

  //   const callApi = async (index) => {
  //     const response = await betLookup[betAction]?.callApi(requestRaw);

  //     if (response.status === "0") {
  //       acceptedAction = {
  //         type: betAction,
  //         request: JSON.parse(requestRaw),
  //         response,
  //       };
  //     }
  //     const retryId = nanoid(20);
  //     response.retryId = retryId;
  //     dispatch(
  //       updateStateRetry({
  //         type: betAction,
  //         request: JSON.parse(requestRaw),
  //         response,
  //         retryId: retryId,
  //       })
  //     );
  //     dispatch(updateCurrentState({ type: betAction, retryId: retryId }));
  //   };

  //   const promises = [];
  //   for (let i = 0; i < parseInt(scheduleData.loop); i++) {
  //     promises.push(callApi(i));
  //   }

  //   await Promise.all(promises);

  //   setLoading(false);
  //   if (acceptedAction) {
  //     dispatch(handleChangeState(betAction));
  //     dispatch(updateDisplayData(acceptedAction));
  //   }
  // };

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
            handleOnSubmitManual(currentState, requestRef.current.value)
          }
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default SabaPlusDataDisplay;
