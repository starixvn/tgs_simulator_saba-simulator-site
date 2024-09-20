import React from "react";
import DataDisplay from "../components/DataDisplay/DataDisplay";
import Popup from "../components/PopupCenter/Popup";
import TabContext from "@mui/lab/TabContext";
import SimulatorTab from "../components/Tab/SimulatorTab";
import { TTab } from "../type/StateType";
import { useSelector, useDispatch } from "react-redux";
import { restartSingleBetStore } from "../store/slices/singleBetSlice";
import { updateTabValue } from "../store/slices/tabSlice";
import "./Simulator.css";
const SabaSW = () => {
  const dispatch = useDispatch();
  const tabValue = useSelector((state) => state.tabSimulator.tabValue);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: TTab) => {
    dispatch(restartSingleBetStore());
    dispatch(updateTabValue(newValue));
  };

  return (
    <TabContext value={tabValue}>
      <Popup />
      <DataDisplay>
        <SimulatorTab handleChange={handleChangeTab}></SimulatorTab>
      </DataDisplay>
    </TabContext>
  );
};

export default SabaSW;
