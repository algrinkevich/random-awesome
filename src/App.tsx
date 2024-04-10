import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as brandsIcons from "@fortawesome/free-brands-svg-icons";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";

import "./App.css";
import { useState } from "react";

const ICONS = [
  ...Object.values(solidIcons),
  ...Object.values(brandsIcons),
  ...Object.values(regularIcons),
];

const getRandomIcon = () => ICONS[Math.floor(Math.random() * ICONS.length)];

function App() {
  const [icon, setIcon] = useState(() => getRandomIcon());
  console.log("Length:", ICONS.length); //2743
  console.log("icon:", icon);

  const showRandomIcon = () => {
    setTimeout(() => setIcon(getRandomIcon()), 3000);
  };

  return (
    <>
      <button onClick={() => showRandomIcon()}>Generate Icon</button>
      <FontAwesomeIcon className="icon-svg" icon={icon} />
    </>
  );
}

export default App;
