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
    <button onClick={onClick} className="random-icon-viewer__button">
      {children}
      {isLoading ? (
        <div className="icon-container">
          <FontAwesomeIcon
            icon={faSpinner}
            spinPulse
            className="random-icon-viewer__spinner random-icon-viewer__button-icon"
          />
          <span className="icon-counter">{counter ? `${counter}` : ""}</span>
        </div>
      ) : (
        <FontAwesomeIcon
          icon={faIcons}
          className="random-icon-viewer__button-icon"
        />
      )}
    </button>
  );
};

export default GetIconButton;
