import SabaPlusPopup from "../SabaPlus/SabaPlusPopup";
import SabaPlusDataDisplay from "../SabaPlus/SabaPlusDataDisplay";
import TabContext from "@mui/lab/TabContext";
import SimulatorTab from "../components/Tab/SimulatorTab";
import { useSelector, useDispatch } from "react-redux";
import { restartSabaPlusStore } from "../store/slices/sabaPlusSlice";
import { updateTabValue } from "../store/slices/tabSlice";

import "./Simulator.css";

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
        <SabaPlusDataDisplay>
          <SimulatorTab handleChange={handleChangeTab}></SimulatorTab>
        </SabaPlusDataDisplay>
      </TabContext>
    </div>
  );
};

export default SabaPlus;
