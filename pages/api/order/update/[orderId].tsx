import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";
import type { Order, OrderStatus } from "@prisma/client";
// import { getSession } from "next-auth/react";

import type { CartType } from "@/lib/storage";

import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";

const handler = nc<NextApiRequest, NextApiResponse>();

export interface BodyDataI {
  status?: OrderStatus;
  taxPrice?: string;
  shippingPrice?: string;
  paymentMethod?: string;
  paymentResultId?: string;
  payedAt?: Date;
  deliveredAt?: Date;
}

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
// handler.use(validateProfileId);

// UPDATING ORDER

handler /* .use(profileBodyValidation) */
  .put(async (req, res) => {
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
    //

    const { orderId } = req.query;

    if (typeof orderId === "object") {
      return res
        .status(500)
        .send(
          "orderId is in wrong format (possibly you have unnecessary `/` in order id )"
        );
    }

    // WE SHOULD VALIDATE THAT ORDER BELONGS TO THE USER
    // WE CAN BUILD MIDDLEWAREE BUT I DON'T HAVE TIME

    const posibleOrder = await prisma.order.findFirst({
      where: {
        id: orderId,
        buyerId: profile.id,
      },
    });

    if (!posibleOrder) {
      return res
        .status(401)
        .send("Unauthorized! Order that doesn't belong to the current profile");
    }

    //
    // WE CAN PARSE BODY AND UPDATE ORDER

    const body = req.body as BodyDataI;

    if (!body) {
      return res.status(400).send("Body is missing");
    }

    if (Object.keys(body).length === 0) {
      return res.status(400).send("Body has no properties on it");
    }
    //
    // console.log({ body });

    // HERE WE CAN UPDATE ORDER
    const data = {};

    for (const key in body) {
      // @ts-ignore
      if (body[key]) {
        // @ts-ignore
        data[key] = body[key];
      }
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: posibleOrder.id,
      },
      data,
    });

    // WE WILL SEND ENTIRE ORDER BACK
    return res.status(200).json({ order: updatedOrder });
  });

export default handler;
