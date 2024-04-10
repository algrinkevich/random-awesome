import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getRandomIcon } from "../../icons";
import GetIconButton from "../GetIconButton";

import "./styles.css";

function RandomIconViewer() {
  const [icon, setIcon] = useState(() => getRandomIcon());
  const [scheduledShowCounter, setScheduledShowCounter] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const showRandomIcon = useCallback(() => {
    setScheduledShowCounter((prev) => prev + 1);
    if (intervalId) {
        return;
    }
    const newIntervalId = setInterval(() => {
        setIcon(getRandomIcon());
        setScheduledShowCounter((prev) => prev - 1);
      }, 3000);
    setIntervalId(newIntervalId);
  }, [intervalId]);

  if (!scheduledShowCounter && intervalId) {
    clearInterval(intervalId);
    setIntervalId(null);
  }

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
