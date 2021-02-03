import advancementParser from "./advancement";
import deathParser from "./death";
import joinParser from "./join";

const parsers: ((line: string) => string | undefined)[] = [
  advancementParser,
  deathParser,
  joinParser,
];

export default parsers;
