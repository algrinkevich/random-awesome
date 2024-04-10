import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as brandsIcons from "@fortawesome/free-brands-svg-icons";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";

import GetIconButton from "../GetIconButton";

import "./styles.css";

const extractIcons = (
  iconsModule: typeof solidIcons | typeof brandsIcons | typeof regularIcons
) => {
  return Object.entries(iconsModule)
    .filter(([key, _]) => /^fa[A-Z0-9].*/.test(key))
    .map(([_, value]) => value) as IconDefinition[];
};

const ICONS = [
  ...extractIcons(solidIcons),
  ...extractIcons(brandsIcons),
  ...extractIcons(regularIcons),
];

const getRandomIcon = () => ICONS[Math.floor(Math.random() * ICONS.length)];

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
      >
        Get Icon
      </GetIconButton>
    </div>
  );
}

export default RandomIconViewer;
