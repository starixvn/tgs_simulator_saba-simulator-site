import { ReactNode } from "react";
import { sabaPlusLookup } from "../helper/sabaPlusHelper";

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
  return (
    <div className="button-group">
      <h4 className="header-text">{headerText}</h4>
      {buttons.map((betKey, index) => (
        <div key={index}>
          <div className="resend-button-group" key={index}>
            <button
              className={`betting-btn ${className}`}
              onClick={() => handleClick(betKey)}
            >
              {sabaPlusLookup[betKey]?.label}
            </button>
          </div>
        </div>
      ))}
      {children}
    </div>
  );
};

export default SabaPlusGroupAPIFlowButton;
