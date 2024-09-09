//@ts-nocheck
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import singleBetLookup from "../../helper/singleBetHelper";
import {
  updateDisplayData,
  handleChangeState,
} from "../../store/slices/singleBetSlice";
import "./DataDisplay.css";
import { nanoid } from "nanoid";

const DataDisplay = () => {
  const requestRef = useRef(null);

  const currentState = useSelector((state) => state.singleBet.currentState);
  const clickedButtons = useSelector((state) => state.singleBet.clickedButtons);
  const dataDisplay = useSelector(
    (state) => state.singleBet.betData[currentState]
  );

  const isViewData = clickedButtons.includes(currentState);

  const dispatch = useDispatch();
  const handleOnSubmit = async () => {
    const response = await singleBetLookup[currentState]?.callApi(
      requestRef.current.value
    );
    dispatch(
      updateDisplayData({
        type: currentState,
        request: JSON.parse(requestRef.current.value),
        response: response,
      })
    );
    if (response.status === "0") {
      dispatch(handleChangeState(currentState));
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
      <button
        className="submit-btn"
        onClick={handleOnSubmit}
        disabled={isViewData}
      >
        Submit
      </button>
    </div>
  );
};

export default DataDisplay;
