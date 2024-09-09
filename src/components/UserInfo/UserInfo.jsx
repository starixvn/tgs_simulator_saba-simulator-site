import { useEffect, useState } from "react";
import "./UserInfo.css";
import { getBalanceApi } from "../../services/api";
import { GetBalance } from "../../constant/Data.json";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../store/slices/userInfoSlice";
const UserInfo = () => {
  const { userId, balance } = useSelector((state) => state.userInfo);
  const [userNameInput, setUserNameInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      const fetchBalance = async () => {
        GetBalance.message.UserId = userId;
        const res = await getBalanceApi(GetBalance);
        if (res.status === "0") {
          dispatch(
            setUserInfo({
              userId: res.userId,
              balance: res.balance,
            })
          );
          return;
        }
      };
      fetchBalance();
    }
  });

  const handleOnSave = async () => {
    GetBalance.message.UserId = userNameInput;

    const response = await getBalanceApi(GetBalance);
    if (response.status === "0") {
      dispatch(
        setUserInfo({ userId: response.userId, balance: response.balance })
      );
      return;
    }
    alert(response.msg);
  };

  return (
    <div className="form-container">
      {Boolean(userId) ? (
        <>
          <label htmlFor="username" className="icon-username">
            {userId}
          </label>
          <label htmlFor="username" className="icon-username">
            balance: {balance}
          </label>
        </>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="username" className="icon-username">
              User Id
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
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

export default UserInfo;
