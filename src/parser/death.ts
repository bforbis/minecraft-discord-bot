const replacers = [
  "^(.+)\\?r (was .*)$",
  "^(.+)\\?r (died.*)$",
  "^(.+)\\?r (drowned.*)$",
  "^(.+)\\?r (withered away.*)$",
  "^(.+)\\?r (burned to death.*)$",
  "^(.+)\\?r (walked into.*)$",
  "^(.+)\\?r (experienced kinetic energy.*)$",
  "^(.+)\\?r (blew up.*)$",
  "^(.+)\\?r (hit.*)$",
  "^(.+)\\?r (fell.*)$",
  "^(.+)\\?r (went.*)$",
  "^(.+)\\?r (tried to.*)$",
  "^(.+)\\?r (discovered the floor was lava)$",
  "^(.+)\\?r (froze)$",
  "^(.+)\\?r (starved)$",
  "^(.+)\\?r (suffocated)$",
  "^(.+)\\?r (didn't want to live.*)$",
  "^(.+)\\?r (didn't want to live.*)$",
];

export default function parseLine(line: string): string | undefined {
  let sanitizedLine: string | undefined;
  replacers.some((regex) => {
    const match = line.match(regex);
    if (match) {
      sanitizedLine = `**${match[1]}** ${match[2]}`.replace(/(\?r)/g, "");
      return true;
    }
    return false;
  });
  return sanitizedLine;
}
