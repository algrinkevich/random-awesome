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
          className="random-icon-viewer__spinner random-icon-viewer__button-icon"
        />
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
