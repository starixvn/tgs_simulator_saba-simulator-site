import * as React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";

type Props = {
  handleChange: (event: React.SyntheticEvent, newValue: string) => void;
  hasBetResultCheck?: boolean;
};

const SimulatorTab = ({ handleChange, hasBetResultCheck = false }: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <TabList onChange={handleChange} className="simulator-tab">
        <Tab value="manual" label="Manual" />
        <Tab value="automate" label="Automate" />
        <Tab value="schedule" label="Schedule" />
        {hasBetResultCheck && (
          <Tab value="bet-result-check" label="Bet Result" />
        )}
      </TabList>
    </Box>
  );
};

export default SimulatorTab;
