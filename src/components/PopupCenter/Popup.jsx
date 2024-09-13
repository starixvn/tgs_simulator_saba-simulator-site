//@ts-nocheck
import { useSelector, useDispatch } from "react-redux";
import {
  updateDisplayData,
  updateCurrentState,
  restartSingleBetStore,
} from "../../store/slices/singleBetSlice";
import UserInfo from "../UserInfo/UserInfo";
import { betLookup } from "../../helper";
import "./Popup.css";
import { useState } from "react";

import GroupButton from "../GroupButton/GroupButton";
import GroupAutoButton from "../GroupAutoButton/GroupAutoButton";
import GroupAPIFlowButton from "../GroupAPIFlowButton/GroupAPIFlowButton";

const Popup = () => {
  const dispatch = useDispatch();
  const clickedButtons = useSelector((state) => state.singleBet.clickedButtons);
  const nextButtons = useSelector((state) => state.singleBet.nextButtons);
  const userId = useSelector((state) => state.userInfo.userId);

  const handleFlowClick = (key) => {
    dispatch(updateCurrentState({ type: key, retryId: null }));
  };

  const restartProcess = (state) => {
    dispatch(restartSingleBetStore());
  };

  const handleActionClick = async (key) => {
    if (!userId) {
      alert("Please insert User Id then click save");
      return;
    }
    const data = betLookup[key]?.getSampleData();
    dispatch(updateDisplayData({ type: key, request: data, response: null }));
    dispatch(updateCurrentState({ type: key, retryId: null }));
  };

  return (
    <div className="popup">
      <div className="popup-header">
        <UserInfo></UserInfo>
      </div>
      <div className="popup-body">
        <GroupAutoButton
          headerText="Auto Action"
          className={"next"}
        ></GroupAutoButton>
        <GroupButton
          headerText="Action"
          buttons={nextButtons}
          handleClick={handleActionClick}
          className={"next"}
        >
          {clickedButtons.length > 0 && (
            <button
              key={`ReStart`}
              className={`next betting-btn`}
              onClick={restartProcess}
            >
              Restart
            </button>
          )}
        </GroupButton>
        <GroupAPIFlowButton
          headerText="API Flow"
          buttons={clickedButtons}
          handleClick={handleFlowClick}
          className={"clicked"}
          isRetry={true}
        ></GroupAPIFlowButton>
      </div>
    </div>
  );
};

export default Popup;
