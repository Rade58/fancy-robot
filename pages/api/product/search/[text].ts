import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async (req, res) => {
  const text = req.query.text as string;

  try {
    const slugs = (
      await prisma.product.findMany({
        where: {
          name: {
            contains: text,
            mode: "insensitive",
          },
        },
        select: {
          name: true,
          id: true,
        },
      })
    ).map((prod) => ({ value: prod.id, label: prod.name }));

    // console.log({ slugs, text });
    // console.log({ text });

    return res.status(200).json(slugs);
    // return res.status(200).json({ text });
  } catch (err) {
    console.error(err);

    return res.status(400).send("something wen wrong");
  }
});

export default handler;
