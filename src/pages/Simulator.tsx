import React from "react";
import DataDisplay from "../components/DataDisplay/DataDisplay";
import Popup from "../components/PopupCenter/Popup";
import TabContext from "@mui/lab/TabContext";
import SimulatorTab from "../components/Tab/SimulatorTab";
import { TTab } from "../type/StateType";
import { useSelector, useDispatch } from "react-redux";
import { restartSingleBetStore } from "../store/slices/singleBetSlice";
import { updateTabValue } from "../store/slices/tabSlice";

const Simulator = () => {
  const dispatch = useDispatch();
  const tabValue = useSelector((state) => state.tabSimulator.tabValue);

  const handleChange = (event: React.SyntheticEvent, newValue: TTab) => {
    dispatch(restartSingleBetStore());
    dispatch(updateTabValue(newValue));
  };

  return (
    <TabContext value={tabValue}>
      <Popup />
      <DataDisplay>
        <SimulatorTab handleChange={handleChange}></SimulatorTab>
      </DataDisplay>
    </TabContext>
  );
};

export default Simulator;
