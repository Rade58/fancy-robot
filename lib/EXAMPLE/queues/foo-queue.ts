import { Queue } from "bullmq";
import connection from "../../redis";

export const QUEUE_NAME = "foo:queue";

export interface DataQI {
  bar: string;
}

const fooQueue = new Queue<DataQI>(QUEUE_NAME, { connection });

export default fooQueue;

// I USED THIS AMONG OTHER THINGS (OTHER BullMQ INSTANCES LIKE Worker AND QueueScheduler),
//  IN THIS ROUTE:
// pages/api/EXAMPLE/hit-foo-queue.ts
