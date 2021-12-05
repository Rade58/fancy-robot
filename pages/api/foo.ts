import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import parseCartFromCookie from "@/lib/storage/backend/parseCartAndKeysFromCookie";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const cookies = req.cookies;

  console.log({ cookies });

  const cartAndKeys = parseCartFromCookie(cookies);

  console.log({ cartAndKeys });

  if (cartAndKeys) {
    const { cart, keys } = cartAndKeys;
    console.log(cart[keys[0]].id);
  }

  return res.status(200).send("hello 666");
});

export default handler;
