import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useIntervalCall } from "../../hooks";
import { getRandomIcon } from "../../icons";
import GetIconButton from "../GetIconButton";

import "./styles.css";

const CHANGE_ICON_INTERVAL_MS = 3_000;

function RandomIconViewer() {
  const [icon, setIcon] = useState(() => getRandomIcon());
  const [scheduledShowCounter, setScheduledShowCounter] = useState(0);
  const changeIcon = useCallback(() => {
    setIcon(getRandomIcon());
    setScheduledShowCounter((prev) => prev - 1);
  }, []);

  const scheduleInterval = useIntervalCall({
    reset: !scheduledShowCounter,
    intervalMs: CHANGE_ICON_INTERVAL_MS,
    callback: changeIcon,
  });

  const showRandomIcon = useCallback(() => {
    setScheduledShowCounter((prev) => prev + 1);
    scheduleInterval();
  }, [scheduleInterval]);

  // it's necessary to unmount the whole component to fix svg rendering issues in Safari
  const containerKey = icon.iconName;

  return (
    <div className="random-icon-viewer-container" key={containerKey}>
      <FontAwesomeIcon
        className="random-icon-viewer__icon"
        icon={icon}
        title={`${icon.iconName.split("-").join(" ")} icon`}
      />
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
