import { useEffect, useState } from "react";
import { getBalanceSabaPlusApi } from "../services/sabaPlusApi";
import {
  setUserInfo,
  restartUserInfoStore,
} from "../store/slices/userInfoSlice";
import { balanceData } from "../constant/SabaPlusData.json";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useDispatch, useSelector } from "react-redux";
const SabaPlusUserInfo = () => {
  const { userId, balance } = useSelector((state) => state.userInfo);
  const [userIdInput, setUserIdInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const validCustId =
      userId || localStorage.getItem("saba-simulator-saba-plus-userId");

    if (validCustId) {
      const fetchBalance = async () => {
        balanceData.Payload.OperatorCustId = validCustId;
        const res = await getBalanceSabaPlusApi(balanceData);

        if (res.ErrorCode === 0) {
          dispatch(
            setUserInfo({
              userId: validCustId,
              balance: res.Payload.Balance,
            })
          );
          return;
        }
      };
      fetchBalance();
    }
  });

  const getUserCustId = (userId: string) => {
    const prefix = "StarixWL_";
    if (userId.startsWith(prefix)) {
      return userId.substring(prefix.length);
    }
    return userId;
  };

  const handleOnSave = async () => {
    const custId = getUserCustId(userIdInput);
    console.log();
    balanceData.Payload.OperatorCustId = custId;
    const response = await getBalanceSabaPlusApi(balanceData);

    if (response.ErrorCode === 0) {
      dispatch(
        setUserInfo({ userId: custId, balance: response.Payload.Balance })
      );
      localStorage.setItem("saba-simulator-saba-plus-userId", custId);
      return;
    }
    alert(response?.msg || "Something went wrong");
  };

  const handleOnChangeAccount = () => {
    localStorage.removeItem("saba-simulator-saba-plus-userId");
    setUserIdInput("");
    dispatch(restartUserInfoStore());
  };

  return (
    <div className="form-container">
      {userId ? (
        <>
          <label htmlFor="username" className="icon-username">
            {userId}{" "}
            <button onClick={handleOnChangeAccount}>
              <ChangeCircleIcon></ChangeCircleIcon>
            </button>
          </label>
          <label className="icon-username">balance: {balance}</label>
        </>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="user-id" className="icon-username">
              User Info
            </label>
            <input
              placeholder="User ID"
              type="text"
              name="user-id"
              id="user-id"
              value={userIdInput}
              onChange={(e) => setUserIdInput(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-save" onClick={handleOnSave}>
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default SabaPlusUserInfo;
