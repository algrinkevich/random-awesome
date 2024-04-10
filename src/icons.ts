import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as brandsIcons from "@fortawesome/free-brands-svg-icons";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";

const ICON_NAME_RE = /^fa[A-Z0-9].*/;

const extractIcons = (
  iconsModule: typeof solidIcons | typeof brandsIcons | typeof regularIcons
) => {
  return Object.entries(iconsModule)
    .filter(([key, _]) => ICON_NAME_RE.test(key))
    .map(([_, value]) => value) as IconDefinition[];
};

const ICONS = [
  ...extractIcons(solidIcons),
  ...extractIcons(brandsIcons),
  ...extractIcons(regularIcons),
];

export const getRandomIcon = () =>
  ICONS[Math.floor(Math.random() * ICONS.length)];
