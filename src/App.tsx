import Popup from "./components/Popup/Popup";
import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";
import DataDisplay from "./components/DataDisplay/DataDisplay";
function App() {
  return (
    <Provider store={store}>
      <Popup />
      <DataDisplay></DataDisplay>
    </Provider>
  );
}

export default App;
