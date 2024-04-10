import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faIcons } from "@fortawesome/free-solid-svg-icons";

import "./styles.css";

interface GetIconButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const GetIconButton = ({
  isLoading,
  children,
  onClick,
}: GetIconButtonProps) => {
  return (
    <button onClick={onClick} className="random-icon-viewer__button">
      {children}
      {isLoading ? (
        <FontAwesomeIcon
          icon={faSpinner}
          spinPulse
          className="random-icon-viewer__spinner button__icon"
        />
      ) : (
        <FontAwesomeIcon icon={faIcons} className="button__icon" />
      )}
    </button>
  );
};

export default GetIconButton;
