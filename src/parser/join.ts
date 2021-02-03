export default function parseLine(line: string): string | undefined {
  const m = line.match(/^\?e(?<player>.*)\?r\?e (?<joinEvent>.*)\?r$/);
  if (m && m.groups) {
    return `**${m.groups.player}** ${m.groups.joinEvent}`;
  }
  return undefined;
}
