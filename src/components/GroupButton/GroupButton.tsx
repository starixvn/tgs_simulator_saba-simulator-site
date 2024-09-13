import { ReactNode } from "react";
import { betLookup } from "../../helper";

type Props = {
  headerText: string;
  buttons: string[];
  handleClick: (button: string) => void;
  className: string;
  children?: ReactNode;
  isRetry: boolean;
};

const GroupButton = ({
  headerText,
  buttons,
  className,
  handleClick,
  children,
}: Props) => {
  return (
    <div className="button-group">
      <h3>{headerText}</h3>
      {buttons.map((button, index) => (
        <div className="resend-button-group" key={index}>
          <button
            className={`betting-btn ${className}`}
            onClick={() => handleClick(button)}
          >
            {betLookup[button]?.label}
          </button>
        </div>
      ))}
      {children}
    </div>
  );
};

export default GroupButton;
