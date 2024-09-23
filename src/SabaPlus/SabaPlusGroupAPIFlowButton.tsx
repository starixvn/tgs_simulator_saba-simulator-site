import { ReactNode } from "react";
import { sabaPlusLookup } from "../helper/sabaPlusHelper";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentState } from "../store/slices/sabaPlusSlice";
type Props = {
  headerText: string;
  buttons: string[];
  handleClick: (button: string) => void;
  className: string;
  children?: ReactNode;
  isRetry: boolean;
};

const SabaPlusGroupAPIFlowButton = ({
  headerText,
  buttons,
  className,
  handleClick,
  children,
}: Props) => {
  const dispatch = useDispatch();
  const betRetryData = useSelector((state) => state.sabaPlus.betRetryData);
  const tabValue = useSelector((state) => state.tabSimulator.tabValue);

  const handleOnReTryButtonOnClick = (key, retryId) => {
    dispatch(updateCurrentState({ type: key, retryId: retryId }));
  };

  return (
    <div className="button-group">
      <h4 className="header-text">{headerText}</h4>
      {buttons.map((betKey, index) => (
        <div key={index}>
          {betKey === "placeBet" &&
          tabValue == "manual" &&
          betRetryData[betKey] ? (
            betRetryData[betKey]?.map((x) => (
              <button
                className={`betting-btn ${className}`}
                onClick={() => {
                  handleOnReTryButtonOnClick(betKey, x.retryId);
                }}
                key={x.retryId}
              >
                {sabaPlusLookup[betKey]?.label}
              </button>
            ))
          ) : (
            <div className="resend-button-group" key={index}>
              <button
                className={`betting-btn ${className}`}
                onClick={() => handleClick(betKey)}
              >
                {sabaPlusLookup[betKey]?.label}
              </button>
            </div>
          )}
        </div>
      ))}
      {children}
    </div>
  );
};

export default SabaPlusGroupAPIFlowButton;
