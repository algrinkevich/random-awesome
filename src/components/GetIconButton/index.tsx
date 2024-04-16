import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faIcons } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

interface GetIconButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  counter?: number;
  onClick: () => void;
}

const GetIconButton = ({
  isLoading,
  children,
  onClick,
  counter,
}: GetIconButtonProps) => {
  return (
    <button onClick={onClick} className="get-icon-button">
      {children}
      {isLoading ? (
        <div className="get-icon-button__spinner">
          <FontAwesomeIcon
            icon={faSpinner}
            spinPulse
            className="get-icon-button__icon"
            title="spinner"
          />
          <span className="get-icon-button__counter">
            {counter ? `${counter}` : ""}
          </span>
        </div>
      ) : (
        <FontAwesomeIcon icon={faIcons} className="get-icon-button__icon" />
      )}
    </button>
  );
};

export default GetIconButton;
