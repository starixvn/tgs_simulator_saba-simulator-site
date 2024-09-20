import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardNavigation from "./components/CardNavigation/CardNavigation";
import { restartSingleBetStore } from "./store/slices/singleBetSlice";
import { restartUserInfoStore } from "./store/slices/userInfoSlice";
import { restartSabaPlusStore } from "./store/slices/sabaPlusSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // initialize State
    dispatch(restartSingleBetStore());
    dispatch(restartUserInfoStore());
    dispatch(restartSabaPlusStore());
  }, []);

  return (
    <>
      <CardNavigation
        description=" This function will be triggered when player place on Saba SW bet, and
          we will send all the relevant bet details in Saba Single Wallet API
          Project."
        title="Saba SW API"
        link="/saba-sw"
      ></CardNavigation>
      <CardNavigation
        title="Saba Plus API"
        description=" This function will be triggered when player place on Saba SW bet, and
          we will send all the relevant bet details in Saba Plus API
          Project."
        link="/saba-plus"
      ></CardNavigation>
    </>
  );
}

export default App;
