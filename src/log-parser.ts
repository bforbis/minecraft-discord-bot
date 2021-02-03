import { Tail } from "tail";
import { enqueueMessageForSend } from "./discord-poster";
import parsers from "./parser";

interface SetupArgs {
  path: string;
  send?: boolean;
  fromBeginning?: boolean;
}

export function setupFileTail({ path, send, fromBeginning }: SetupArgs): Tail {
  const tail = new Tail(path, {
    follow: true,
    fromBeginning,
  });
  tail.on("line", (line) => {
    return processLine(line, send);
  });
  tail.on("error", processError);
  return tail;
}

export function processLine(line: string, send = false): string | undefined {
  const parsed = parseLine(line);

  if (!parsed || parsed.loglevel !== "INFO") {
    return undefined;
  }

  let sanitizedLine: string | undefined;
  for (let i = 0; i < parsers.length; i++) {
    if ((sanitizedLine = parsers[i](parsed.line))) {
      break;
    }
  }
  if (!sanitizedLine) {
    return undefined;
  }
  const message = `[${parsed.time}] ${sanitizedLine}`;
  console.debug(message.replace(/\*/g, ""));
  if (send) {
    enqueueMessageForSend(message);
  }
  return sanitizedLine;
}

export function parseLine(
  line: string
): { time: string; loglevel: string; line: string } | undefined {
  const match = line.match(
    /^\[(?<time>\d{2}:\d{2}:\d{2})\] \[Server thread\/(?<loglevel>\w+)\]: (?<line>.*)$/
  );
  if (match && match.groups) {
    return {
      time: match.groups.time,
      loglevel: match.groups.loglevel,
      line: match.groups.line,
    };
  }
  return undefined;
}

function processError(error: unknown): void {
  console.error(`Error: ${error}`);
}
