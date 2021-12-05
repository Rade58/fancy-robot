import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const { foo } = req.query;

  // console.log({ BODY: req.body });
  // console.log({ HEADERS: req.headers });

  return res.status(200).json({ baz: `hello 666 ${foo}` });
});

export default handler;
