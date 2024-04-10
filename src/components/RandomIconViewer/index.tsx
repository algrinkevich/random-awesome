import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as brandsIcons from "@fortawesome/free-brands-svg-icons";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";

import "./styles.css";


const ICONS = [
  ...Object.values(solidIcons),
  ...Object.values(brandsIcons),
  ...Object.values(regularIcons),
];

const getRandomIcon = () => ICONS[Math.floor(Math.random() * ICONS.length)];

function RandomIconViewer() {
  const [icon, setIcon] = useState(() => getRandomIcon());

  const showRandomIcon = () => {
    setTimeout(() => setIcon(getRandomIcon()), 3000);
  };

  return (
    <div className="viewer-container">
      <button onClick={() => showRandomIcon()}>Generate Icon</button>
      <FontAwesomeIcon className="icon-svg" icon={icon} />
    </div>
  );
}

export default RandomIconViewer;
