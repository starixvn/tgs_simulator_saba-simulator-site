//@ts-nocheck
import { useSelector, useDispatch } from "react-redux";
import SabaPlusButtonGroup from "./SabaPlusButtonGroup";
import SabaPlusGroupAPIFlowButton from "./SabaPlusGroupAPIFlowButton";
import SabaPlusUserInfo from "./SabaPlusUserInfo";
import {
  updateDisplayData,
  updateCurrentState,
  restartSabaPlusStore,
} from "../store/slices/sabaPlusSlice";
import TabPanel from "@mui/lab/TabPanel";
import { sabaPlusLookup } from "../helper/sabaPlusHelper";
import SabaIcon from "../components/SabaIcon/SabaIcon";
const SabaPlusPopup = () => {
  const dispatch = useDispatch();
  const clickedButtons = useSelector((state) => state.sabaPlus.clickedButtons);
  const nextButtons = useSelector((state) => state.sabaPlus.nextButtons);
  const userId = useSelector((state) => state.userInfo.userId);
  const handleFlowClick = (key) => {
    dispatch(updateCurrentState({ type: key, retryId: null }));
  };

  const restartProcess = () => {
    dispatch(restartSabaPlusStore());
  };

  const handleActionClick = async (key) => {
    if (!userId) {
      alert("Please insert User Id then click save");
      return;
    }

    const data = sabaPlusLookup[key]?.getSampleData();

    dispatch(updateDisplayData({ type: key, request: data, response: null }));
    dispatch(updateCurrentState({ type: key, retryId: null }));
  };

  return (
    <div className="popup">
      <div className="popup-header">
        <SabaIcon
          altText="saba-plus-icon"
          imageName="saba-plus.png"
          className="custom-icon-class"
        ></SabaIcon>
        <SabaPlusUserInfo></SabaPlusUserInfo>
      </div>
      <div className="popup-body">
        <TabPanel value="manual">
          <SabaPlusButtonGroup
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
          </SabaPlusButtonGroup>
          <SabaPlusGroupAPIFlowButton
            headerText="API Flow"
            buttons={clickedButtons}
            handleClick={handleFlowClick}
            className={"clicked"}
            isRetry={true}
          ></SabaPlusGroupAPIFlowButton>
        </TabPanel>
      </div>
    </div>
  );
};

export default SabaPlusPopup;
