import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

import type {
  Order,
  OrderStatus,
  PaymentProvider,
  PaymentResult,
  OrderElement,
} from "@prisma/client";
// import { getSession } from "next-auth/react";

// import type {} from '@paypal/react-paypal-js'

import type { ProfileInsert } from "@/pages/api/auth/[...nextauth]";

import verifyUserMiddleware from "@/middlewares/verifyUserMiddleware";

import type { PropsI } from "@/pages/order/[orderId]";

const handler = nc<NextApiRequest, NextApiResponse>();

export interface BodyDataI {
  payment: {
    paymentId: string;
    update_time: string;
    status:
      | "COMPLETED"
      | "SAVED"
      | "APPROVED"
      | "VOIDED"
      | "PAYER_ACTION_REQUIRED";
    email_address: string;
    totalPrice: string;
    paymentProvider: PaymentProvider;
  };
}

export type ResData = PropsI;

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

// CREATING PAYMENT RESULT AND UPDATING ORDER

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
    // WE CAN PARSE BODY AND CREATE PAYMENT RSULT RECORD

    const body = req.body as BodyDataI;

    if (!body) {
      return res.status(400).send("Body is missing");
    }

    if (Object.keys(body).length === 0) {
      return res.status(400).send("Body has no properties on it");
    }

    const { payment } = body;

    await prisma.paymentResult.create({
      data: {
        paymentId: payment.paymentId,
        paymentProvider: "PayPal",
        totalPrice: payment.totalPrice,
        email: payment.email_address,
        status: payment.status,
        update_time: payment.update_time,
        orders: {
          connect: {
            id: posibleOrder.id,
          },
        },
      },
    });

    // WE CAN NOW UPDATE ORDER RECORD (HIS STATUS)

    const updatedOrder = await prisma.order.update({
      where: {
        id: posibleOrder.id,
      },
      data: {
        status: "FULFILLED",
        payedAt: new Date(),
      },
      include: {
        paymentResult: true,
        items: {
          include: {
            product: true,
          },
        },
        buyer: true,
      },
    });

    const resData: ResData = {
      order: updatedOrder,
      sumasAndPrices: {
        formated: {
          shippingPrice: "",
          subtotalPrice: "",
          totalPrice: "",
        },
        shippingPrice: 0,
        subtotalPrice: 0,
        taxPricePercentage: 0,
        totalPrice: 0,
      },
    };

    // WE CAN SEN PAYMENTRESULT RECORD AND ORDER BACK

    return res.status(200).json(resData);
  });

export default handler;
