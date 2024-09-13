import { useDispatch, useSelector } from "react-redux";
import {
  restartSingleBetStore,
  handleChangeState,
  updateDisplayData,
  updateCurrentState,
} from "../../store/slices/singleBetSlice";
import { betLookup } from "../../helper";
type Props = {
  headerText: string;
  handleClick: (button: string) => void;
};
const GroupAutoButton = ({ headerText }: Props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userInfo.userId);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const onAutoClickHandle = async (keys) => {
    if (!userId) {
      alert("Please insert User Id then click save");
      return;
    }
    dispatch(restartSingleBetStore());
    for (let i = 0; i < keys.length; i++) {
      const dataSample = betLookup[keys[i]]?.getSampleData();
      const response = await betLookup[keys[i]]?.callApi(dataSample);
      dispatch(updateCurrentState({ type: keys[i], retryId: null }));
      dispatch(
        updateDisplayData({
          type: keys[i],
          request: dataSample,
          response: response,
        })
      );

      if (response.status !== "0") {
        return;
      }
      dispatch(handleChangeState(keys[i]));
      await delay(1000);
    }
  };

  return (
    <div className="button-group">
      <h3>{headerText}</h3>
      <button
        className={`betting-btn next`}
        onClick={() =>
          onAutoClickHandle(["placeBet", "confirmBet", "settleBet"])
        }
      >
        Auto Single Bet
      </button>
      <button
        className={`betting-btn next`}
        onClick={() =>
          onAutoClickHandle([
            "placeBetParlay",
            "confirmBetParlay",
            "settleBetParlay",
          ])
        }
      >
        Auto Parlay Bet
      </button>
    </div>
  );
};

export default GroupAutoButton;
