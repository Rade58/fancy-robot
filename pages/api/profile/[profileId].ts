import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

// import type { Product, Favorite } from "@prisma/client";

import prisma from "@/lib/prisma";
import type { Profile } from "@prisma/client";
// import { getSession } from "next-auth/react";

import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";

import validateProfileBody from "@/middlewares/validateProfileBody";

import validateProfileId from "@/middlewares/validateProfileId";

import type { ProfileDataType } from "@/lib/validations/profileSchema";

const handler = nc<NextApiRequest, NextApiResponse>();

export interface ResData {
  updatedProfile: Profile;
}

export type BodyDataTypeI = ProfileDataType;

// -------- WE SPECIFY FOR WHAT ROUTE AND FOR WHAT METHOD WE ARE GOING TO
// ALLOW THIS MIDDLEWARE
const profileBodyValidation = nc<NextApiRequest, NextApiResponse>().put(
  "/api/profile/:profileId",
  validateProfileBody()
);
// ------------------

// MIDDLEWARES
handler.use(validateProfileId);
handler.use(verifyUserMiddleware);

// THIS MIDDLEWARE IS ONLY GOING TO WORK FOR THIS ROUTE
handler.use(profileBodyValidation).put(async (req, res) => {
  // @ts-ignore
  // const profile = req.profile as ProfileInsert;

  // console.log({ profile });

  const data = req.body as ProfileDataType;

  const { profileId } = req.query;

  if (typeof profileId === "object") {
    return res
      .status(500)
      .send(
        "profile id is in wrong format (possibly you have unnecessary `/` in product id )"
      );
  }

  if (!data) {
    return res.status(400).send("Body is missing");
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).send("Body has no data on it");
  }
  console.log(data);

  // HERE WE CAN UPDATE PROFILE
  const updatedProfile = await prisma.profile.update({
    where: {
      id: profileId,
    },
    data,
  });

  return res.status(200).json({ updatedProfile });
  // return res.status(200).json(data);
});

/* handler.get(async (req, res) => {
  return res.status(200).send("hello world");
}); */

export default handler;
