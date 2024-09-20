//@ts-nocheck
import { useSelector, useDispatch } from "react-redux";
import SabaPlusButtonGroup from "./SabaPlusButtonGroup";
import SabaPlusGroupAPIFlowButton from "./SabaPlusGroupAPIFlowButton";
import SabaPlusUserInfo from "./SabaPlusUserInfo";
import {
  updateDisplayData,
  updateCurrentState,
} from "../store/slices/sabaPlusSlice";
import TabPanel from "@mui/lab/TabPanel";
import { sabaPlusLookup } from "../helper/sabaPlusHelper";
const SabaPlusPopup = () => {
  const dispatch = useDispatch();
  const clickedButtons = useSelector((state) => state.sabaPlus.clickedButtons);
  const nextButtons = useSelector((state) => state.sabaPlus.nextButtons);

  const handleFlowClick = (key) => {
    dispatch(updateCurrentState(key));
  };

  // const restartProcess = (state) => {
  //   dispatch(restartSingleBetStore());
  // };

  const handleActionClick = async (key) => {
    const data = sabaPlusLookup[key]?.getSampleData();

    dispatch(updateDisplayData({ type: key, request: data, response: null }));
    dispatch(updateCurrentState(key));
  };

  return (
    <div className="popup">
      <div className="popup-header">
        <SabaPlusUserInfo></SabaPlusUserInfo>
      </div>
      <div className="popup-body">
        <TabPanel value="manual">
          <SabaPlusButtonGroup
            headerText="Action"
            buttons={nextButtons}
            handleClick={handleActionClick}
            className={"next"}
          ></SabaPlusButtonGroup>
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
