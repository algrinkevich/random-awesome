import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getRandomIcon } from "../../icons";
import GetIconButton from "../GetIconButton";

import "./styles.css";

function RandomIconViewer() {
  const [icon, setIcon] = useState(() => getRandomIcon());
  const [scheduledShowCounter, setScheduledShowCounter] = useState(0);

  const showRandomIcon = useCallback(() => {
    setScheduledShowCounter((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!scheduledShowCounter) {
      return;
    }
    const intervalId = setInterval(() => {
      setIcon(getRandomIcon());
      setScheduledShowCounter((prev) => prev - 1);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [scheduledShowCounter]);

  return (
    <div className="random-icon-viewer-container">
      <FontAwesomeIcon className="random-icon-viewer__icon" icon={icon} />
      <GetIconButton
        isLoading={scheduledShowCounter > 0}
        onClick={showRandomIcon}
        counter={scheduledShowCounter}
      >
        Get Icon
      </GetIconButton>
    </div>
  );
}

export default RandomIconViewer;
