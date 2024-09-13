import { ReactNode } from "react";
import { betLookup } from "../../helper";
import ReSendIcon from "@mui/icons-material/RestartAlt";
import {
  updateCurrentState,
  updateStateRetry,
} from "../../store/slices/singleBetSlice";
import { useSelector, useDispatch } from "react-redux";

import { nanoid } from "nanoid";

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
  isRetry,
}: Props) => {
  const dispatch = useDispatch();
  const dataResponse = useSelector((state) => state.singleBet.betData);
  const retryData = useSelector((state) => state.singleBet.betRetryData);

  const handleResendOnClick = async (key: string) => {
    const dataSender = dataResponse[key].request;
    console.log(dataSender);
    const betDataRequest = {
      ...dataSender,
      message: {
        ...dataSender.message,
      },
    };
    const response = await betLookup[key]?.callApi(betDataRequest);

    dispatch(
      updateStateRetry({
        type: key,
        request: betDataRequest,
        response: response,
        retryId: nanoid(),
      })
    );
  };
  const handleOnReTryButtonOnClick = (key, retryId) => {
    dispatch(updateCurrentState({ type: key, retryId: retryId }));
  };

  return (
    <div className="button-group">
      <h3>{headerText}</h3>
      {buttons.map((button, index) => (
        <>
          {" "}
          <div className="resend-button-group" key={index}>
            <button
              className={`betting-btn ${className}`}
              onClick={() => handleClick(button)}
            >
              {betLookup[button]?.label}
            </button>
            {button === buttons[buttons.length - 1] && isRetry && (
              <a onClick={() => handleResendOnClick(button)}>
                <ReSendIcon className="resend-btn"></ReSendIcon>
              </a>
            )}
          </div>
          {retryData[button]?.map((x, index) => (
            <button
              className={`betting-btn ${className}`}
              onClick={() => handleOnReTryButtonOnClick(button, x.retryId)}
              key={retryData[button].retryId}
            >
              Resend {betLookup[button]?.label} {index + 1}
            </button>
          ))}
        </>
      ))}
      {children}
    </div>
  );
};

export default GroupAPIFlowButton;
