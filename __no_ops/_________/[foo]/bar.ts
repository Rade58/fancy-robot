import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const { foo } = req.query;

  return res.status(200).json({ baz: `hello 666 ${foo}` });
});

export default handler;
