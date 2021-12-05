import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import type { Order } from "@prisma/client";
// import { getSession } from "next-auth/react";

import type { CartType } from "@/lib/storage";

import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";
import validateProfileId from "@/middlewares/validateProfileId";

const handler = nc<NextApiRequest, NextApiResponse>();

export interface ResData {
  orderId: string;
}

// todo (DONE: CartType IMPORTED)
// export type OrderDataType = someType
//

// --------
/* const profileBodyValidation = nc<NextApiRequest, NextApiResponse>().put(
  "/api/profile/:profileId",
  validateProfileBody()
); */
// ------------------

// MIDDLEWARES
handler.use(verifyUserMiddleware);
handler.use(validateProfileId);

// CREATING ORDER

handler /* .use(profileBodyValidation) */
  .post(async (req, res) => {
    // @ts-ignore
    const profile = req.profile as ProfileInsert; // verifyUserMiddleware INSERS THIS
    // console.log({ profile });

    // REDIRECT TO SIGNIN IF THERE IS NO PROFILE
    if (!profile) {
      res.writeHead(302, {
        Location: "/signin",
      });

      return res.status(500).end();
    }
    //
    //
    // -----------------------------------

    const cart = req.body as CartType;

    const { profileId } = req.query;

    if (typeof profileId === "object") {
      return res
        .status(500)
        .send(
          "profileId is in wrong format (possibly you have unnecessary `/` in profile id )"
        );
    }

    if (!cart) {
      return res.status(400).send("Body is missing");
    }

    if (Object.keys(cart).length === 0) {
      return res.status(400).send("Body has no cart on it");
    }
    //
    console.log({ cart });

    // HERE WE CAN CREATE ORDER
    const order = await prisma.order.create({
      data: {
        buyer: {
          connect: { id: profile.id },
        },
      },
    });

    // LETS NOW CREATE ORDER ELEMENTS
    // ALSO WE WILL CONNECT ORDER ELEMENTS
    // TO THE UPPER ORDER
    for (const key in cart) {
      const item = cart[key];

      await prisma.orderElement.create({
        data: {
          order: {
            connect: {
              id: order.id,
            },
          },
          product: {
            connect: {
              id: item.id,
            },
          },
          quantity: item.count,
        },
      });
    }

    const data: ResData = {
      orderId: order.id,
    };

    console.log({ orderId: order.id });

    // WE WILL SEND ORDER ID
    return res.status(201).json(data);
  });

export default handler;
