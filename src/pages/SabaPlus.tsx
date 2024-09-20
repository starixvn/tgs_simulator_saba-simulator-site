import SabaPlusPopup from "../SabaPlus/SabaPlusPopup";
import SabaPlusDataDisplay from "../SabaPlus/SabaPlusDataDisplay";
import TabContext from "@mui/lab/TabContext";
import SimulatorTab from "../components/Tab/SimulatorTab";
import "./Simulator.css";

const SabaPlus = () => {
  const handleChangeTab = (event: React.SyntheticEvent, newValue: TTab) => {};
  return (
    <div className="container-root">
      <TabContext value={"manual"}>
        <SabaPlusPopup />
        <SabaPlusDataDisplay>
          <SimulatorTab handleChange={handleChangeTab}></SimulatorTab>
        </SabaPlusDataDisplay>
      </TabContext>
    </div>
  );
};

export default SabaPlus;
