import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import SabaSW from "./pages/SabaSW";
import SabaPlus from "./pages/SabaPlus";
import store from "./store/store";
import { Provider } from "react-redux";
const AppRoutes = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/saba-sw" element={<SabaSW />} />
        <Route path="/saba-plus" element={<SabaPlus />} />
      </Routes>
    </Router>
  </Provider>
);

export default AppRoutes;
