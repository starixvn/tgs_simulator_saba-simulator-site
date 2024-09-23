import { useState, ReactNode } from "react";
import { useDispatch } from "react-redux";
import {
  updateScheduleData,
  updateDisplayData,
  updateCurrentState,
} from "../store/slices/sabaPlusSlice";
import { sabaPlusLookup } from "../helper/sabaPlusHelper";

type Props = {
  headerText: string;
  buttons: string[];
  className: string;
  children?: ReactNode;
};
const SabaPlusGroupScheduleButton = ({
  headerText,
  buttons,
  className,
  children,
}: Props) => {
  const dispatch = useDispatch();
  const [intervalValue, setIntervalValue] = useState(null);
  const [loopValue, setLoopValue] = useState(null);

  const handleIntervalChange = (event) => {
    const intervalValue = event.target.value;
    if (intervalValue < 0) {
      alert("Please insert interval value greater than 0");
      return;
    }
    setIntervalValue(intervalValue);
    dispatch(updateScheduleData({ interval: intervalValue, loop: loopValue }));
  };

  const handleLoopChange = (event) => {
    const loopValue = event.target.value;
    if (loopValue < 0) {
      alert("Please insert Loop value greater than 0");
      return;
    }
    setLoopValue(loopValue);
    dispatch(updateScheduleData({ interval: intervalValue, loop: loopValue }));
  };

  const handleOnclickScheduleButton = (key) => {
    if (!intervalValue || !loopValue) {
      alert("Please insert Interval and Loop");
      return;
    }

    const data = sabaPlusLookup[key]?.getSampleData();

    dispatch(updateDisplayData({ type: key, request: data, response: null }));
    dispatch(updateCurrentState({ type: key, retryId: null }));
  };
  return (
    <div className="button-group">
      <h4 className="header-text">{headerText}</h4>
      <div className="form-group">
        <input
          placeholder="Interval (s)"
          type="number"
          id="interval"
          onChange={handleIntervalChange}
        />
      </div>
      <div className="input-group">
        <input
          placeholder="Loop"
          type="number"
          id="loop"
          onChange={handleLoopChange}
        />
      </div>
      {buttons.map((button, index) => (
        <div key={index}>
          {sabaPlusLookup[button] && (
            <button
              className={`betting-btn ${className}`}
              onClick={() => handleOnclickScheduleButton(button)}
            >
              {sabaPlusLookup[button]?.label}
            </button>
          )}
        </div>
      ))}
      {children}
    </div>
  );
};

export default SabaPlusGroupScheduleButton;
