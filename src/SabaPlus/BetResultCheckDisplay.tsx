import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { updateBetResultCheckApi } from "../services/betResultCheckApi";
import { updateDataDisplay } from "../store/slices/betResultCheckSlice";
const BetResultCheckDisplay = () => {
  const dataDisplay = useSelector((state) => state.betResultCheck.dataDisplay);
  const requestRef = useRef(null);
  const dispatch = useDispatch();
  console.log(dataDisplay);
  const handleOnSubmit = async (requestRaw) => {
    const response = await updateBetResultCheckApi(requestRaw);
    dispatch(
      updateDataDisplay({
        request: JSON.parse(requestRaw),
        response: response,
      })
    );
  };

  return (
    <div key={nanoid(20)}>
      <div className="data-row">
        <div className="data-box">
          <textarea
            placeholder="Request Body"
            ref={requestRef}
            className="json-editor"
            rows={15}
            defaultValue={
              dataDisplay?.request
                ? JSON.stringify(dataDisplay?.request, null, 2)
                : null
            }
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

      <button
        className="submit-btn"
        onClick={() => handleOnSubmit(requestRef.current.value)}
      >
        Submit
      </button>
    </div>
  );
};

export default BetResultCheckDisplay;
