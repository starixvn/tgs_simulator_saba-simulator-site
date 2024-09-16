import { Provider } from "react-redux";
import store from "./store/store";
import "./App.css";
import Simulator from "./pages/Simulator";

function App() {
  return (
    <Provider store={store}>
      <Simulator></Simulator>
    </Provider>
  );
}

export default App;
