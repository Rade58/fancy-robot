import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import type { Product, Favorite } from "@prisma/client";

import prisma from "@/lib/prisma";
// import { getSession } from "next-auth/react";

import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";

const handler = nc<NextApiRequest, NextApiResponse>();

export interface FavoritesDataTypeWhenDeleting {
  favorite: "deleted";
  favorites: (Favorite & {
    product: Product;
  })[];
}

// MIDDLEWARES
// AUTHENTICATION MIDDLEWARE
handler.use(verifyUserMiddleware);

// JUST TO KNOW (THIS SHOULD BE POST BECAUSE WE ARE TRYING TO CREATE NEW RECORD)
// IN THE TERMS OF GETTING RECORD :
// (WE ARE GOING TO GET RECORD IN GET SERVER SIDE PROPS)
// AGAIN, ONLY SIGNED IN USER SHOULD SEE THE HEART BUTTON
handler.post(async (req, res) => {
  // IF EVERYTHING WENT WELL WITH AUTHENTICATION PROFILE SHOUD BE ON REQUEST
  // @ts-ignore
  const profile = req.profile as ProfileInsert;

  const { productId } = req.query;

  if (typeof productId === "object") {
    return res
      .status(500)
      .send(
        "product id is in wrong format (possibly you have unnecessary `/` in product id )"
      );
  }

  // FIRST WE NEED TO CHECK IF USER ALREADY ADDED PRODUCT TO THE FAVORITES

  const existingFavorite = await prisma.favorite.findFirst({
    where: {
      productId,
      profileId: profile.id,
    },
    select: {
      id: true,
    },
  });

  if (existingFavorite) {
    return res.status(400).send("Product already added to favorites!");
  }

  // WE CREATE FAVORITE HERE
  const favorite = await prisma.favorite.create({
    data: {
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
  });

  return res.status(200).json({ favorite });
});

handler.delete(async (req, res) => {
  const { productId } = req.query;
  // profile SHOULD BE ON REQUEST BECAUSE WE INSERTED IT WITH
  // MIDDLEWARE
  // @ts-ignore
  const profile = req.profile as ProfileInsert;
  //

  if (typeof productId === "object") {
    return res
      .status(500)
      .send(
        "product id is in wrong format (possibly you have unnecessary `/` in product id )"
      );
  }

  // WE CAN FIRST LOOK IF FAVORITE OBJECT EXISTS
  const posibleFavorite = await prisma.favorite.findFirst({
    where: {
      product: {
        id: productId,
      },
      profile: {
        id: profile.id,
      },
    },
    select: {
      id: true,
    },
  });

  if (!posibleFavorite) {
    return res.status(400).send("favorite record missing");
  }

  // WE CAN DELETE NOW

  await prisma.favorite.delete({
    where: {
      id: posibleFavorite.id,
    },
  });

  // SINCE I KNOW THAT I WOULD NEED AGAIN ALL THE FAVORITES
  // LETS SEND THEM BACK

  const favorites = await prisma.favorite.findMany({
    where: {
      profileId: profile.id,
    },
    // AND WE SHOULD JOIN
    // BECAUSE WE NEED PRODUCTS TOO
    include: {
      product: true,
    },
  });

  // SENDING ALL FAVORITES BUT ALSO I WILL SEND {favorite: "deleted"}
  // I'M DOING THIS AS A CONVINIENCE WHEN I'M DELETING
  // ONLY FAVORITE THROU INDIVIDUAL PRODUCT PAGE
  // (THERE I DON'T NEED ALL FAVORITES)
  // BUT I AM SENDING ALL FAVORITES BECAUSE I NEED THEM ON STATS PAGE

  return res.status(200).json({ favorites, favorite: "deleted" });
});

export default handler;
