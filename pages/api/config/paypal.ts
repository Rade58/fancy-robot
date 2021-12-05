import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const session = await getSession({ req });

  // console.log({ session });

  if (!session) {
    return res
      .status(401)
      .send("Not authenticated!, Acessing to Pypal Client id not allowed!");
  }

  // console.log(process.env.PAYPAL_CLIENT_ID);

  return res.status(200).send(process.env.PAYPAL_CLIENT_ID);
});

export default handler;
