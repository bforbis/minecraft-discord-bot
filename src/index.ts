import yargs from "yargs/yargs";
import { setupFileTail } from "./log-parser";

import * as dotenv from "dotenv";
dotenv.config();
if (!(process.env.DISCORD_WEBHOOK || "").startsWith("https://discord.com")) {
  console.error("Error: DISCORD_WEBHOOK env is not set");
  process.exit(1);
}

const argv = yargs(process.argv.slice(2)).options({
  path: {
    alias: "p",
    type: "string",
    describe: "provide a path to the logfile to parse",
    normalize: true,
    demandOption: true,
  },
  send: {
    alias: "s",
    type: "boolean",
    default: false,
    describe: "Send logs to discord",
  },
  fromBeginning: {
    alias: "f",
    type: "boolean",
    default: false,
    describe: "tail logs from the beginning of the file",
  },
}).argv;

setupFileTail({
  path: argv.path,
  send: argv.send,
  fromBeginning: argv.fromBeginning,
});
