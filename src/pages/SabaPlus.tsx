import SabaPlusPopup from "../SabaPlus/SabaPlusPopup";

import TabContext from "@mui/lab/TabContext";
import SimulatorTab from "../components/Tab/SimulatorTab";
import { useSelector, useDispatch } from "react-redux";
import { restartSabaPlusStore } from "../store/slices/sabaPlusSlice";
import { updateTabValue } from "../store/slices/tabSlice";

import "./Simulator.css";
import SabaPlusWrapper from "../SabaPlus/SabaPlusWrapper";

const SabaPlus = () => {
  const dispatch = useDispatch();
  const tabValue = useSelector((state) => state.tabSimulator.tabValue);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: TTab) => {
    dispatch(restartSabaPlusStore());
    dispatch(updateTabValue(newValue));
  };
  return (
    <div className="container-root saba-plus-root">
      <TabContext value={tabValue}>
        <SabaPlusPopup />
        <SabaPlusWrapper>
          <SimulatorTab
            handleChange={handleChangeTab}
            hasBetResultCheck
          ></SimulatorTab>
        </SabaPlusWrapper>
      </TabContext>
    </div>
  );
};

export default SabaPlus;
