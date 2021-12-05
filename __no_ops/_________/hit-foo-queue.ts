import type { NextApiRequest, NextApiResponse } from "next";

import nc from "next-connect";

import { Worker, QueueScheduler } from "bullmq";

import connection from "@/lib/redis";

import fooQueue, { QUEUE_NAME } from "@/lib/EXAMPLE/queues/foo-queue";
import type { DataQI } from "@/lib/EXAMPLE/queues/foo-queue";

// CREATE Scheduler (REQUIREMENT FOR DELAYED JOBS)
const fooScheduler = new QueueScheduler(QUEUE_NAME, { connection });

// CREATE Worker
const fooWorker = new Worker<DataQI>(
  QUEUE_NAME,
  async (job) => {
    // HERE WE PROCESS THE QUEUED JOB
    console.log({ jobData: job.data });
  },
  {
    connection,
  }
);

// CREATE NEXT CONNECT APP
const handler = nc<NextApiRequest, NextApiResponse>();

// ROUTE
handler.get(async (req, res) => {
  // PUTIG ONE JOB IN A QUEUE WHEN THIS ROUTE IS HITTED
  // BUT HIS PROCESSING SHOUD BE DELAYED BY 6 SECONDS AND 66 MILISECONDS
  await fooQueue.add(
    "baz_key",
    { bar: "bartzabel" },
    {
      delay: 6660,
    }
  );

  return res.status(200).send("job added");
});

export default handler;

// WE CAN TEST THIS BY STARTING OUR THINGS
// yarn redis:dev
// yarn dev

// AND BY SENDING REQUEST WITH HTTPIE (I PREFER HTTPIE)
//  http GET :3000/api/EXAMPLE/hit-foo-queue
//
// AFTER SENDING REQUEST WE SHOULD SE IMMEDIATELLY THAT
// ADDING TO QUEUE HAPPENED
// BUT PROCESSING OF JOB WILL HAPPENN AFTER 6660 MILISECONDS
