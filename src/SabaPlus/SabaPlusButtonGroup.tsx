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

const SabaPlusButtonGroup = ({
  headerText,
  buttons,
  className,
  handleClick,
  children,
}: Props) => {
  return (
    <div className="button-group">
      <h4 className="header-text">{headerText}</h4>
      {buttons.map((key, index) => (
        <div key={index}>
          <button
            className={`betting-btn ${className}`}
            onClick={() => handleClick(key)}
          >
            {sabaPlusLookup[key].label}
          </button>
        </div>
      ))}
      {children}
    </div>
  );
};

export default SabaPlusButtonGroup;
