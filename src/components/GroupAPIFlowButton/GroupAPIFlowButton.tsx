import { ReactNode } from "react";
import { betLookup } from "../../helper";
import { updateCurrentState } from "../../store/slices/singleBetSlice";
import { useSelector, useDispatch } from "react-redux";

type Props = {
  headerText: string;
  buttons: string[];
  handleClick: (button: string) => void;
  className: string;
  children?: ReactNode;
  isRetry: boolean;
};

const GroupAPIFlowButton = ({
  headerText,
  buttons,
  className,
  handleClick,
  children,
}: Props) => {
  const dispatch = useDispatch();

  const betRetryData = useSelector((state) => state.singleBet.betRetryData);
  const tabValue = useSelector((state) => state.tabSimulator.tabValue);

  const handleOnReTryButtonOnClick = (key, retryId) => {
    dispatch(updateCurrentState({ type: key, retryId: retryId }));
  };

  return (
    <div className="button-group">
      <h4 className="header-text">{headerText}</h4>
      {buttons.map((betKey, index) => (
        <>
          {tabValue === "schedule" ? (
            betRetryData[betKey]?.map((x) => (
              <button
                className={`betting-btn ${className}`}
                onClick={() => handleOnReTryButtonOnClick(betKey, x.retryId)}
                key={betRetryData[betKey].retryId}
              >
                {betLookup[betKey]?.label}
              </button>
            ))
          ) : (
            <div className="resend-button-group" key={index}>
              <button
                className={`betting-btn ${className}`}
                onClick={() => handleClick(betKey)}
              >
                {betLookup[betKey]?.label}
              </button>
            </div>
          )}
        </>
      ))}
      {children}
    </div>
  );
};

export default GroupAPIFlowButton;
