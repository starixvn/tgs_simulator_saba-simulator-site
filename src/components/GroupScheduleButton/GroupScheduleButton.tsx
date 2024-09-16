import { ReactNode, useState } from "react";
import { betLookup } from "../../helper";
import { useDispatch } from "react-redux";
import {
  updateDisplayData,
  updateCurrentState,
  updateScheduleData,
} from "../../store/slices/singleBetSlice";
type Props = {
  headerText: string;
  buttons: string[];
  className: string;
  children?: ReactNode;
};

const GroupScheduleButton = ({
  headerText,
  buttons,
  className,
  children,
}: Props) => {
  const [intervalValue, setIntervalValue] = useState(null);
  const [loopValue, setLoopValue] = useState(null);
  const dispatch = useDispatch();

  const handleOnclickScheduleButton = (key) => {
    if (!intervalValue || !loopValue) {
      alert("Please insert Interval and Loop");
      return;
    }
    if (intervalValue < 0 || intervalValue < 0) {
      alert("Please insert Interval and Loop greater than 0");
      return;
    }
    const data = betLookup[key]?.getSampleData();
    dispatch(updateScheduleData({ interval: intervalValue, loop: loopValue }));
    dispatch(updateDisplayData({ type: key, request: data, response: null }));
    dispatch(updateCurrentState({ type: key, retryId: null }));
  };

  return (
    <div className="button-group">
      <div className="form-group">
        <h4 className="header-text">{headerText}</h4>
        <input
          placeholder="Interval (s)"
          type="number"
          name="interval"
          id="interval"
          value={intervalValue}
          onChange={(e) => setIntervalValue(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Loop"
          type="number"
          name="loop"
          id="loop"
          value={loopValue}
          onChange={(e) => setLoopValue(e.target.value)}
        />
      </div>
      {buttons.map((button, index) => (
        <div key={index}>
          {betLookup[button] && (
            <button
              className={`betting-btn ${className}`}
              onClick={() => handleOnclickScheduleButton(button)}
            >
              {betLookup[button]?.label}
            </button>
          )}
        </div>
      ))}
      {children}
    </div>
  );
};

export default GroupScheduleButton;
