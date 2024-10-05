import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardNavigation from "./components/CardNavigation/CardNavigation";
import { restartSingleBetStore } from "./store/slices/singleBetSlice";
import { restartUserInfoStore } from "./store/slices/userInfoSlice";
import { restartSabaPlusStore } from "./store/slices/sabaPlusSlice";
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined';
import CasinoOutlinedIcon from '@mui/icons-material/CasinoOutlined';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // initialize State
    dispatch(restartSingleBetStore());
    dispatch(restartUserInfoStore());
    dispatch(restartSabaPlusStore({}));
  }, []);

  return (
    <>
      <CardNavigation
        description=" This function will be triggered when player place on Saba SW bet, and
          we will send all the relevant bet details in Saba Single Wallet API
          Project."
        title="Saba SW API"
        icon={<SportsSoccerOutlinedIcon               color="warning"
          sx={{ fontSize: "4rem" }}
          style={{ color: "#302f59" }}></SportsSoccerOutlinedIcon>}
        link="/saba-sw"
      ></CardNavigation>
      <CardNavigation
        title="Saba Plus API"
        description=" This function will be triggered when player place on Saba Plus bet, and
          we will send all the relevant bet details in Saba Plus API
          Project."
        icon={<CasinoOutlinedIcon />}
        iconWrapper={{borderRadius: "10%" }}
        link="/saba-plus"
      ></CardNavigation>
    </>
  );
}

export default App;
