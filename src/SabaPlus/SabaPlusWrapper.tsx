//@ts-nocheck
import React from "react";
import SabaPlusDataDisplay from "./SabaPlusDataDisplay";
import TabPanel from "@mui/lab/TabPanel";
import BetResultCheckDisplay from "./BetResultCheckDisplay";
const SabaPlusWrapper = ({ children }) => {
  return (
    <div className="data-container">
      {children}
      <TabPanel value="manual">
        <SabaPlusDataDisplay></SabaPlusDataDisplay>
      </TabPanel>
      <TabPanel value="schedule">
        <SabaPlusDataDisplay></SabaPlusDataDisplay>
      </TabPanel>
      <TabPanel value="automate">
        <SabaPlusDataDisplay></SabaPlusDataDisplay>
      </TabPanel>
      <TabPanel value="bet-result-check">
        <BetResultCheckDisplay></BetResultCheckDisplay>
      </TabPanel>
    </div>
  );
};

export default SabaPlusWrapper;
