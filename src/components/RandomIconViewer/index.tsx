import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as brandsIcons from "@fortawesome/free-brands-svg-icons";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";

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
  const [isLoading, setIsLoading] = useState(false);

  const showRandomIcon = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIcon(getRandomIcon());
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="random-icon-viewer-container">
      <button
        onClick={() => showRandomIcon()}
        className="random-icon-viewer__button"
      >
        Generate Icon
      </button>
      {isLoading ? (
        <FontAwesomeIcon
          icon={solidIcons.faSpinner}
          spinPulse
          size="2xl"
          className="random-icon-viewer__spinner"
        />
      ) : (
        <FontAwesomeIcon className="random-icon-viewer__icon" icon={icon} />
      )}
    </div>
  );
}

export default RandomIconViewer;
