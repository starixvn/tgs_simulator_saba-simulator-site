import "./App.css";
import CardNavigation from "./components/CardNavigation/CardNavigation";

function App() {
  return (
    <>
      <CardNavigation
        description=" This function will be triggered when player place on SaBa SW bet, and
          we will send all the relevant bet details in Saba Single Wallet API
          Project."
        title="SaBa SW API"
        link="/saba-sw"
      ></CardNavigation>
      <CardNavigation
        title="SaBa Plus API"
        description=" This function will be triggered when player place on SaBa SW bet, and
          we will send all the relevant bet details in Saba Plus API
          Project."
        link="/saba-plus"
      ></CardNavigation>
    </>
  );
}

export default App;
