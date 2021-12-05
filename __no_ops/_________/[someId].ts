import type { NextApiRequest, NextApiResponse } from "next";

import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const { someId } = req.query;

  res.setHeader("Content-Type", "application/json");

  res.status(200).send({ message: `Hello ${someId}` });
});

// export default handler;

export default function handleAnimal(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { someId },
  } = req;

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: `Hello ${someId}` }));
}
