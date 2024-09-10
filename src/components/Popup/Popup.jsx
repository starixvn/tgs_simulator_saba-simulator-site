//@ts-nocheck
import { useSelector, useDispatch } from "react-redux";
import {
  updateDisplayData,
  updateCurrentState,
  restartSingleBetStore,
} from "../../store/slices/singleBetSlice";
import UserInfo from "../UserInfo/UserInfo";
import singleBetLookup from "../../helper/singleBetHelper";
import "./Popup.css";

const Popup = () => {
  const dispatch = useDispatch();
  const clickedButtons = useSelector((state) => state.singleBet.clickedButtons);
  const nextButtons = useSelector((state) => state.singleBet.nextButtons);
  const { userId, balance } = useSelector((state) => state.userInfo);

  const handleActionClick = (key) => {
    if (!userId) {
      alert("Please insert User Id then click save");
      return;
    }
    const data = singleBetLookup[key]?.getSampleData();
    dispatch(updateDisplayData({ type: key, request: data, response: null }));
    dispatch(updateCurrentState(key));
  };

  const handleFlowClick = (key) => {
    dispatch(updateCurrentState(key));
  };

  const restartProcess = (state) => {
    dispatch(restartSingleBetStore());
  };

  return (
    <div className="popup">
      <div className="popup-header">
        <UserInfo></UserInfo>
      </div>
      <div className="popup-body">
        <div className="button-group">
          <h3>Action</h3>
          {nextButtons.map((button, index) => (
            <button
              key={index}
              className={`${button} next betting-btn`}
              onClick={() => handleActionClick(button)}
            >
              {singleBetLookup[button]?.label}
            </button>
          ))}
          {clickedButtons.length > 0 && (
            <button
              key={`ReStart`}
              className={`next betting-btn`}
              onClick={restartProcess}
            >
              Restart
            </button>
          )}
        </div>
        <div className="button-group">
          <h3>API Flow</h3>
          {clickedButtons.map((button, index) => (
            <button
              key={index}
              className={`${button} clicked betting-btn`}
              onClick={() => handleFlowClick(button)}
            >
              {singleBetLookup[button]?.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
