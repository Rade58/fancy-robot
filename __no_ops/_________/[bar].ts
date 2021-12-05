import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma/";
// import prisma from "../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const { bar } = req.query;

  // OK LETS USE PRISMA CLIENT TO MAKE A Profile RECORD
  // LETS MAKE TWO PROFILE RECORDS

  await prisma.profile.create({
    data: {
      nick: bar as string,
    },
  });

  await prisma.profile.create({
    data: {
      nick: bar as string,
    },
  });

  // LETS TAKE ALL PROFILES (I WANT TO SEE IF seeding HAPPEND)

  const allProfiles = await prisma.profile.findMany();

  console.log(JSON.stringify(allProfiles, null, 2));

  return res.status(200).json(allProfiles);
});

export default handler;
