import type { Middleware } from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import { getSession, getCsrfToken } from "next-auth/react";

import prisma from "@/lib/prisma";

const verifyUser: Middleware<NextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  // CHECKING IF WE HAVE SESSION

  // console.log({ COOKIES: req.cookies });

  const session = await getSession({ req });

  // const token = await getCsrfToken({ req });

  // console.log({ session });
  // console.log({ token });

  if (!session) {
    return res
      .status(401)
      .send("Unauthenticated! Users session doesn't exists");
  }
  // FETCHING THE USER FROM OUR DATABASE
  const profile = await prisma.profile.findUnique({
    where: {
      id: session.profile?.id,
    },
    select: {
      id: true,
      userId: true,
    },
  });
  // CHECKING THAT WE ACTUALLY HAVE A USER IN THE DATBASE
  if (!profile) {
    return res
      .status(401)
      .send("Unauthenticated! We don't have such a user in our database");
  }
  // WE CAN CHECK IF ID IS OK
  if (profile.id !== session.profile?.id) {
    return res
      .status(401)
      .send("Unauthenticated! something is wrong with profile id");
  }
  // LETS CHECK USER TOO
  if (session.userId !== profile.userId) {
    return res.status(401).send("Unauthenticated! User ids mismatch");
  }

  // WE CAN CALL next HERE SINCE EVERYTHING SEEMS OK IN HERE
  // BUT LETS INSERT PROFILE OBJECT ON THE REQUEST
  // @ts-ignore
  req.profile = session.profile;

  next();
};

export default verifyUser;
