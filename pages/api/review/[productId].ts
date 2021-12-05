// NOOP
//
//
//

import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import type { Profile } from "@prisma/client";
// import { getSession } from "next-auth/react";

import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";

// import validateProfileId from "@/middlewares/validateProfileId";

const handler = nc<NextApiRequest, NextApiResponse>();

export interface ResData {
  updated: true;
}

export type BodyDataTypeI = { rating: number; text: string };

// --------
/* const profileBodyValidation = nc<NextApiRequest, NextApiResponse>().put(
  "/api/profile/:profileId",
  validateProfileBody()
); */
// ------------------

// MIDDLEWARES
// handler.use(validateProfileId);
handler.use(verifyUserMiddleware);

handler./* use(profileBodyValidation). */ post(async (req, res) => {
  // @ts-ignore
  const profile = req.profile as ProfileInsert;

  // console.log({ profile });

  const data = req.body as BodyDataTypeI;

  const { productId } = req.query;

  if (typeof productId === "object") {
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

  // TODO
  // CREATE REVIEW
  // CALCULATE AVERAGE RATING
  // UPDATE RATING ON THE PRODUCT

  const review = await prisma.review.create({
    data: {
      comment: data.text,
      rating: data.rating,
      product: {
        connect: {
          id: productId,
        },
      },
      profile: {
        connect: {
          id: profile.id,
        },
      },
    },
    include: {
      product: true,
    },
  });

  // GET THE PRODUCT
  const product = await prisma.product.findUnique({
    where: {
      id: review.product.id,
    },
    select: {
      averageRating: true,
      id: true,
    },
  });

  if (!product) {
    return res.status(400).send("We couldn't find the product");
  }

  // UPDATE PRODUCT WITH NEW RATING
  await prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      averageRating: Math.round((product.averageRating + data.rating) / 2),
    },
  });

  //

  return res.status(200).json({ updated: true });
});

export default handler;
