import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getRandomIcon } from "../../icons";
import GetIconButton from "../GetIconButton";

import "./styles.css";

const CHANGE_ICON_INTERVAL_MS = 3_000;

function RandomIconViewer() {
  const [icon, setIcon] = useState(() => getRandomIcon());
  const [scheduledShowCounter, setScheduledShowCounter] = useState(0);
  const [changeIconIntervalId, setChangeIconIntervalId] = useState<number | null>(null);

  const showRandomIcon = useCallback(() => {
    setScheduledShowCounter((prev) => prev + 1);
    if (changeIconIntervalId) {
        return;
    }
    const newIntervalId = setInterval(() => {
        setIcon(getRandomIcon());
        setScheduledShowCounter((prev) => prev - 1);
      }, CHANGE_ICON_INTERVAL_MS);
    setChangeIconIntervalId(newIntervalId);
  }, [changeIconIntervalId]);

  if (!scheduledShowCounter && changeIconIntervalId) {
    clearInterval(changeIconIntervalId);
    setChangeIconIntervalId(null);
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
