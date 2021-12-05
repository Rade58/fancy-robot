import type { Middleware } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";

import prisma from "@/lib/prisma";

const verifyProfileId: Middleware<NextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  // WE WANT TO CHECK IF QUERY PARAM ACTUALLY MATCH
  // THE ID ON SESSION
  // BECAUSE IF THAT IS NOT THE CASE ONE USER CAN
  // ACCESS OR MUTATE DATA OF ANOTHER USER

  const { profileId } = req.query;

  const session = await getSession({ req });

  if (profileId !== session?.profile?.id) {
    return res
      .status(401)
      .send("You are not authorized to access or mutate data of another user");
  }

  //
  //
  //
  //
  next();
};

export default verifyProfileId;
