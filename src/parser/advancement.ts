export default function parseLine(line: string): string | undefined {
  const m = line.match(
    /^(?<player>.*)\?r has made the advancement (?<advancement>.*)\?r$/
  );
  if (m && m.groups) {
    const advancement = m.groups.advancement.replace(/(\?[a|e|r]|\[|\])/g, "");
    return `**${m.groups.player}** has made the advancement [**${advancement}**]`;
  }
  return undefined;
}
