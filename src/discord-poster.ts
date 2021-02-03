import axios, { AxiosResponse, AxiosError } from "axios";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  minTime: 500, // Only allow 1 request per 500ms
  maxConcurrent: 1, // Only allow 1 request at a time
  highWater: 50, // Start leaking old messages if the queue backs up past 50 messages
  strategy: Bottleneck.strategy.LEAK,
});

limiter.on("failed", (error: AxiosError, jobInfo) => {
  console.log(`[limiter] Job failed: ${error}`);
  if (error.response && error.response.status === 429) {
    return error.response.headers["retry-after"] || 2000;
  } else if (jobInfo.retryCount < 2) {
    return 250;
  }
});

limiter.on("retry", (message) =>
  console.log(`[limiter] Job retrying: ${message}`)
);
// limiter.on("debug", (message, data) => {
//   console.log(`[limiter:debug] ${message}`);
// });

export const enqueueMessageForSend = limiter.wrap(sendMessage);
async function sendMessage(message: string): Promise<AxiosResponse> {
  return axios.post(process.env.DISCORD_WEBHOOK || "", {
    content: message,
    username: process.env.DISCORD_USERNAME,
  });
}
